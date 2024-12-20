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
      const petExists = await AdocaoController.entityExists('pet', petId);
      if (!petExists) {
        return res.status(404).json({ error: 'Pet não encontrado.' });
      }
  
      const adotanteExists = await AdocaoController.entityExists('adotante', adotanteId);
      if (!adotanteExists) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }
  
      const petJaAdotado = await prismaClient.adocao.findUnique({
        where: { petId },
      });
      if (petJaAdotado) {
        return res.status(400).json({ error: 'Este pet já foi adotado.' });
      }
  
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
  
      if (!novaAdocaoDb.adotante || !novaAdocaoDb.pet) {
        return res.status(404).json({ error: 'Adotante ou Pet não encontrado.' });
      }
  
      await prismaClient.pet.update({
        where: { id: petId },
        data: { status: "1" },
      });
  
      const novaAdocao = new Adocao(novaAdocaoDb);
      novaAdocao.dataAdocao = formatDate(novaAdocao.dataAdocao);
  
      const adotanteEmail = novaAdocaoDb.adotante.email;
      if (!adotanteEmail) {
        return res.status(404).json({ error: 'Email do adotante não encontrado.' });
      }
  
      const adotanteNome = novaAdocaoDb.adotante.nome;
      const petNome = novaAdocaoDb.pet.nome;
  
      const subject = 'Adoção de pet - Solicitação recebida';
      const html = getAdoçãoConfirmationEmailTemplate(adotanteNome, petNome);
  
      try {
        await sendEmail(adotanteEmail, subject, html);
      } catch (emailError) {
        console.error("Erro ao enviar o e-mail:", emailError);
        return res.status(500).json({ error: 'Erro ao enviar o e-mail de confirmação.' });
      }
  
      res.status(201).json(novaAdocao);
    } catch (error) {
      console.error("Erro ao criar adoção:", error);
      res.status(500).json({ error: 'Erro ao criar a adoção.' });
    }
  }
  
  static async getAllAdocoesForPetAndAdotante(req, res) {
    try {
      const adocoesDb = await prismaClient.adocao.findMany({
        include: {
          adotante: true,
          pet: true,
        },
      });
  
      if (adocoesDb.length === 0) {
        return res.status(404).json({
          message: 'Nenhuma adoção encontrada.',
        });
      }
  
      const adocoes = adocoesDb.map((adocaoDb) => {
        const adocao = new Adocao(adocaoDb);
        adocao.dataAdocao = formatDate(adocao.dataAdocao);
  
        adocao.adotante = {
          id: adocaoDb.adotante.id,
          nome: adocaoDb.adotante.nome,
          email: adocaoDb.adotante.email,
        };
  
        adocao.pet = {
          id: adocaoDb.pet.id,
          nome: adocaoDb.pet.nome,
          idade: adocaoDb.pet.idade,
          especie: adocaoDb.pet.especie,
          foto: adocaoDb.pet.foto
        };
  
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

  static async getAllAdocoes(req, res) {
    try {
      // Buscar todas as adoções, incluindo os dados do adotante e do pet
      const adocoesDb = await prismaClient.adocao.findMany({
        include: {
          adotante: true,  // Incluir dados do adotante
          pet: true,       // Incluir dados do pet
        },
      });
  
      if (adocoesDb.length === 0) {
        return res.status(404).json({
          message: 'Nenhuma adoção encontrada.',
        });
      }
  
      // Mapeia as adoções para formatar os dados de forma personalizada
      const adocoes = adocoesDb.map((adocaoDb) => {
        const adocao = new Adocao(adocaoDb);
        adocao.dataAdocao = formatDate(adocao.dataAdocao); // Formatar data da adoção
  
        // Estrutura os dados de adotante e pet
        adocao.adotante = {
          nome: adocaoDb.adotante.nome,
          email: adocaoDb.adotante.email,
          // Adicione outros dados do adotante conforme necessário
        };
  
        adocao.pet = {
          nome: adocaoDb.pet.nome,
          idade: adocaoDb.pet.idade,
          especie: adocaoDb.pet.especie,
          // Adicione outros dados do pet conforme necessário
        };
  
        return adocao;
      });
  
      // Retorna todas as adoções encontradas
      res.status(200).json(adocoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Erro ao buscar as adoções.',
      });
    }
  }
  
  
}

export default AdocaoController;
