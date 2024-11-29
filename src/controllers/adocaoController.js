import { prismaClient } from '../database/prismaClient.js';
import Adocao from '../entities/adocao.js';
import { formatDate } from '../utils/dateUtils.js';
import StatusAdocao from '../enums/statusAdocao.js';
import sendEmail from '../services/emailService.js';
import { getAdoçãoStatusUpdateEmailTemplate } from '../utils/templates/getAdoçãoStatusUpdateEmailTemplate.js';
import { getAdoçãoConfirmationEmailTemplate } from '../utils/templates/getAdoçãoConfirmationEmailTemplate.js';

class AdocaoController {
  static async entityExists(type, id) {
    const entity = await prismaClient[type].findUnique({
      where: { id },
    });
    return entity !== null;
  }

  static async createAdocao(req, res) {
    const { adotanteId, petId } = req.body;
  
    try {
      // Verificar se o pet existe
      const petExists = await AdocaoController.entityExists('pet', petId);
      if (!petExists) {
        return res.status(404).json({ error: 'Pet não encontrado.' });
      }
  
      // Verificar se o adotante existe
      const adotanteExists = await AdocaoController.entityExists('adotante', adotanteId);
      if (!adotanteExists) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }
  
      // Verificar se o pet já foi adotado
      const petJaAdotado = await prismaClient.adocao.findUnique({
        where: { petId },
      });
      if (petJaAdotado) {
        return res.status(400).json({ error: 'Este pet já foi adotado.' });
      }
  
      // Criar a adoção no banco de dados
      const novaAdocaoDb = await prismaClient.adocao.create({
        data: {
          adotanteId,
          petId,
          status: StatusAdocao.SOLICITACAO_ENVIADA,
        },
        include: {
          adotante: true,
          pet: true,
        },
      });
  
      // Verificar se o adotante e pet foram retornados corretamente
      if (!novaAdocaoDb.adotante || !novaAdocaoDb.pet) {
        return res.status(404).json({ error: 'Adotante ou Pet não encontrado.' });
      }
  
      // Alterar o status do pet para "adotado" (1)
      await prismaClient.pet.update({
        where: { id: petId },
        data: { status: "1" }, // Atualiza para "adotado"
      });
  
      // Criar o objeto de adoção
      const novaAdocao = new Adocao(novaAdocaoDb);
      novaAdocao.dataAdocao = formatDate(novaAdocao.dataAdocao);
  
      // Obter o e-mail do adotante
      const adotanteEmail = novaAdocaoDb.adotante.email;
      if (!adotanteEmail) {
        return res.status(404).json({ error: 'Email do adotante não encontrado.' });
      }
  
      // Obter o nome do adotante e do pet
      const adotanteNome = novaAdocaoDb.adotante.nome;
      const petNome = novaAdocaoDb.pet.nome;
  
      // Definir o assunto e o corpo do e-mail
      const subject = 'Adoção de pet - Solicitação recebida';
      const html = getAdoçãoConfirmationEmailTemplate(adotanteNome, petNome);
  
      // Enviar e-mail de confirmação
      try {
        await sendEmail(adotanteEmail, subject, html);
      } catch (emailError) {
        console.error("Erro ao enviar o e-mail:", emailError);
        return res.status(500).json({ error: 'Erro ao enviar o e-mail de confirmação.' });
      }
  
      // Retornar a resposta com a nova adoção criada
      res.status(201).json(novaAdocao);
    } catch (error) {
      console.error("Erro ao criar adoção:", error);
      res.status(500).json({ error: 'Erro ao criar a adoção.' });
    }
  }
  

  static async getAllAdocoes(req, res) {
    try {
      const adocoesDb = await prismaClient.adocao.findMany({
        include: {
          adotante: true,
          pet: true,
        },
      });
      const adocoes = adocoesDb.map((adocaoDb) => {
        const adocao = new Adocao(adocaoDb);
        adocao.dataAdocao = formatDate(adocao.dataAdocao);
        return adocao;
      });
      res.status(200).json(adocoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Erro ao buscar as adoções.',
      });
    }
  }

  static async getAdocaoById(req, res) {
    const { id } = req.params;

    try {
      const adocaoDb = await prismaClient.adocao.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          adotante: true,
          pet: true,
        },
      });

      if (adocaoDb) {
        const dataAdocaoFormatada = formatDate(new Date(adocaoDb.dataAdocao));
        const adocao = new Adocao({ ...adocaoDb, dataAdocao: dataAdocaoFormatada });
        res.status(200).json(adocao);
      } else {
        res.status(404).json({ error: 'Adoção não encontrada.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar a adoção.' });
    }
  }

  static async updateAdocao(req, res) {
    const { id } = req.params;
    const { adotanteId, petId, status } = req.body;
  
    try {
      const adocaoExistente = await prismaClient.adocao.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          adotante: true,
          pet: true,
        },
      });
  
      if (!adocaoExistente) {
        return res.status(404).json({ error: 'Adoção não encontrada.' });
      }
  
      const { nome: nomeAdotante, email: adotanteEmail } = adocaoExistente.adotante || {};
      const { nome: nomePet } = adocaoExistente.pet || {};
  
      const petExists = await AdocaoController.entityExists('pet', petId);
      const adotanteExists = await AdocaoController.entityExists('adotante', adotanteId);
  
      if (!petExists) {
        return res.status(404).json({ error: 'Pet não encontrado.' });
      }
      if (!adotanteExists) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }
  
      const adocaoAtualizadaDb = await prismaClient.adocao.update({
        where: { id: parseInt(id, 10) },
        data: {
          adotanteId,
          petId,
          status,
          dataAdocao: new Date(),
        },
      });
  
      const dataAdocaoFormatada = formatDate(new Date(adocaoAtualizadaDb.dataAdocao));
  
      const adocaoAtualizada = new Adocao({ 
        ...adocaoAtualizadaDb, 
        dataAdocao: dataAdocaoFormatada 
      });
  
      if (adocaoExistente.status !== status) {
        const subject = `Atualização no processo de adoção para ${adocaoExistente.pet.nome}`;
        const html = getAdoçãoStatusUpdateEmailTemplate(nomeAdotante, nomePet, status);
        await sendEmail(adotanteEmail, subject, html);
      }
  
      res.status(200).json(adocaoAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar a adoção.' });
    }
  }

  static async getStatusAdocaoPorPetId(req, res) {
    const { petId } = req.params;

    try {
      const adocaoDb = await prismaClient.adocao.findFirst({
        where: {
          petId: parseInt(petId, 10),
        },
        include: {
          pet: true, 
        },
      });

      if (!adocaoDb) {
        return res.status(404).json({ error: 'Nenhuma adoção encontrada para este pet.' });
      }

      const dataAdocaoFormatada = formatDate(new Date(adocaoDb.dataAdocao));

      const adocao = new Adocao({
        ...adocaoDb,
        dataAdocao: dataAdocaoFormatada,
      });

      res.status(200).json({ status: adocao.status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o status da adoção.' });
    }
  }

  static async deleteAdocao(req, res) {
    const { id } = req.params;

    try {
      await prismaClient.adocao.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir a adoção.' });
    }
  }

  static async getAdocaoByPetId(req, res) {
    const { petId } = req.params;
  
    try {
      const adocaoDb = await prismaClient.adocao.findFirst({
        where: {
          petId: parseInt(petId, 10),
        },
        include: {
          pet: true,
          adotante: true,
        },
      });
  
      if (!adocaoDb) {
        return res.status(404).json({ error: 'Este pet não está em adoção.' });
      }
  
      const dataAdocaoFormatada = formatDate(new Date(adocaoDb.dataAdocao));
  
      const horaAdocaoFormatada = new Date(adocaoDb.dataAdocao).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
  
      const adocao = new Adocao({
        ...adocaoDb,
        dataAdocao: dataAdocaoFormatada,
        horaAdocao: horaAdocaoFormatada,
      });
  
      res.status(200).json(adocao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar a adoção deste pet.' });
    }
  }
  
}

export default AdocaoController;
