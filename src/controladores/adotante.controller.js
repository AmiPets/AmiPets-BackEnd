// src/controllers/AdotanteController.js
import { PrismaClient } from '@prisma/client';
import Adotante from '../entities/adotante.entity.js';

const prisma = new PrismaClient();

class AdotanteController {
  // Create (criação já implementada)
  static async createAdotante(req, res) {
    const { nome, email, telefone, endereco, senha, isAdmin } = req.body;
    try {
      const newAdotante = await prisma.Adotante.create({
        data: {
          nome,
          email,
          telefone,
          endereco,
          senha,
          isAdmin,
        },
      });
      res.status(201).json(new Adotante(newAdotante));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o Adotante.' });
    }
  }

  // Read - Obter todos os Adotantes
  static async getAllAdotantes(req, res) {
    try {
      const Adotantes = await prisma.Adotante.findMany();
      res.status(200).json(Adotantes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar os Adotantes.' });
    }
  }

  // Read - Obter Adotante por ID
  static async getAdotanteById(req, res) {
    const { id } = req.params;

    try {
      const Adotante = await prisma.Adotante.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (Adotante) {
        res.status(200).json(Adotante);
      } else {
        res.status(404).json({ error: 'Adotante não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o Adotante.' });
    }
  }

  // Update - Atualizar Adotante por ID
  static async updateAdotante(req, res) {
    const { id } = req.params;
    const { nome, especie, dataNascimento, descricao, tamanho, personalidade } =
      req.body;

    try {
      const updatedAdotante = await prisma.Adotante.update({
        where: { id: parseInt(id, 10) },
        data: {
          nome,
          especie,
          dataNascimento,
          descricao,
          tamanho,
          personalidade,
        },
      });
      res.status(200).json(updatedAdotante);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o Adotante.' });
    }
  }

  // Delete - Remover Adotante por ID
  static async deleteAdotante(req, res) {
    const { id } = req.params;

    try {
      await prisma.Adotante.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(204).send(); // Resposta sem conteúdo
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir o Adotante.' });
    }
  }
}

export default AdotanteController;
