import { PrismaClient } from '@prisma/client';
import Adocao from '../entities/adocao.entity.js'; // Importe a entidade Adocao

const prisma = new PrismaClient();

class AdocaoController {
  // Create - Criar uma nova adoção
  static async createAdocao(req, res) {
    const { adotanteId, petId } = req.body;

    try {
      // Verificar se o pet existe
      const pet = await prisma.pet.findUnique({
        where: { id: petId },
      });
      if (!pet) {
        return res.status(404).json({ error: 'Pet não encontrado.' });
      }

      // Verificar se o adotante existe
      const adotante = await prisma.adotante.findUnique({
        where: { id: adotanteId },
      });
      if (!adotante) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }

      // Verificar se o pet já está adotado
      const petJaAdotado = await prisma.adocao.findUnique({
        where: { petId },
      });
      if (petJaAdotado) {
        return res.status(400).json({ error: 'Este pet já foi adotado.' });
      }

      // Criar nova adoção no banco
      const novaAdocaoDb = await prisma.adocao.create({
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
      const adocoesDb = await prisma.adocao.findMany({
        include: {
          adotante: true,
          pet: true,
        },
      });
      // Mapear registros para a classe Adocao
      const adocoes = adocoesDb.map((adocaoDb) => new Adocao(adocaoDb));
      res.status(200).json(adocoes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error:
            'Erro ao buscar as adoções. Verifique se pet ou adotante existe.',
        });
    }
  }

  // Read - Obter adoção por ID
  static async getAdocaoById(req, res) {
    const { id } = req.params;

    try {
      const adocaoDb = await prisma.adocao.findUnique({
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
      // Verificar se o pet existe
      const pet = await prisma.pet.findUnique({
        where: { id: petId },
      });
      if (!pet) {
        return res.status(404).json({ error: 'Pet não encontrado.' });
      }

      // Verificar se o adotante existe
      const adotante = await prisma.adotante.findUnique({
        where: { id: adotanteId },
      });
      if (!adotante) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }

      // Atualizar a adoção no banco
      const adocaoAtualizadaDb = await prisma.adocao.update({
        where: { id: parseInt(id, 10) },
        data: {
          adotanteId,
          petId,
        },
      });
      // Instanciar a adoção atualizada usando a classe Adocao
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
      await prisma.adocao.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir a adoção.' });
    }
  }
}

export default AdocaoController;
