import { prismaClient } from '../database/prismaClient.js';
import Adocao from '../entities/adocao.js';

class AdocaoController {
  // Método para verificar a existência de um registro
  static async entityExists(type, id) {
    const entity = await prismaClient[type].findUnique({
      where: { id },
    });
    return entity !== null;
  }

  // Create - Criar uma nova adoção
  static async createAdocao(req, res) {
    const { adotanteId, petId } = req.body;

    try {
      // Verificar se o pet e o adotante existem
      const petExists = await AdocaoController.entityExists('pet', petId);
      const adotanteExists = await AdocaoController.entityExists('adotante', adotanteId);

      if (!petExists) {
        return res.status(404).json({ error: 'Pet não encontrado.' });
      }
      if (!adotanteExists) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }

      // Verificar se o pet já está adotado
      const petJaAdotado = await prismaClient.adocao.findUnique({
        where: { petId },
      });
      if (petJaAdotado) {
        return res.status(400).json({ error: 'Este pet já foi adotado.' });
      }

      // Criar nova adoção no banco
      const novaAdocaoDb = await prismaClient.adocao.create({
        data: {
          adotanteId,
          petId,
        },
      });

      // Instanciar a nova adoção usando a classe Adocao
      const novaAdocao = new Adocao(novaAdocaoDb);
      res.status(201).json(novaAdocao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar a adoção.' });
    }
  }

  // Read - Obter todas as adoções
  static async getAllAdocoes(req, res) {
    try {
      const adocoesDb = await prismaClient.adocao.findMany({
        include: {
          adotante: true,
          pet: true,
        },
      });
      const adocoes = adocoesDb.map((adocaoDb) => new Adocao(adocaoDb));
      res.status(200).json(adocoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Erro ao buscar as adoções. Verifique se pet ou adotante existe.',
      });
    }
  }

  // Read - Obter adoção por ID
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
        const adocao = new Adocao(adocaoDb);
        res.status(200).json(adocao);
      } else {
        res.status(404).json({ error: 'Adoção não encontrada.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar a adoção.' });
    }
  }

  // Update - Atualizar adoção por ID
  static async updateAdocao(req, res) {
    const { id } = req.params;
    const { adotanteId, petId } = req.body;

    try {
      // Verificar se o pet e o adotante existem
      const petExists = await AdocaoController.entityExists('pet', petId);
      const adotanteExists = await AdocaoController.entityExists('adotante', adotanteId);

      if (!petExists) {
        return res.status(404).json({ error: 'Pet não encontrado.' });
      }
      if (!adotanteExists) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }

      // Atualizar a adoção no banco
      const adocaoAtualizadaDb = await prismaClient.adocao.update({
        where: { id: parseInt(id, 10) },
        data: {
          adotanteId,
          petId,
        },
      });
      const adocaoAtualizada = new Adocao(adocaoAtualizadaDb);
      res.status(200).json(adocaoAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar a adoção.' });
    }
  }

  // Delete - Remover adoção por ID
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

  // Read - Obter todas as adoções feitas por um usuário específico
  static async getAdocoesByAdotanteId(req, res) {
    const { adotanteId } = req.params;

    try {
      const adocoes = await prismaClient.adocao.findMany({
        where: { adotanteId: parseInt(adotanteId, 10) },
        include: {
          pet: true,
          adotante: true,
        },
      });

      res.status(200).json(adocoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Erro ao buscar adoções para o adotante especificado.',
      });
    }
  }
}

export default AdocaoController;
