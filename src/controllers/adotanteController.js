// src/controllers/AdotanteController.js
import { PrismaClient } from '@prisma/client';
import Adotante from '../entities/adotante.js';

const prisma = new PrismaClient();

class AdotanteController {
  // Read - Obter todos os Adotantes
  static async getAdotanteById(req, res) {
    const { id } = req.params;

    try {
      const adotante = await prisma.adotante.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (adotante) {
        res.status(200).json(new Adotante(adotante));
      } else {
        res.status(404).json({ error: 'Adotante não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o Adotante.' });
    }
  };

  // Update - Atualizar Adotante por ID
  static async updateAdotante(req, res) {
    const { id } = req.params;
    const { nome, email, telefone, endereco, senha, isAdmin } = req.body;

    try {
      const adotante = await prisma.adotante.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!adotante) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }

      const updatedAdotante = new Adotante({
        id: adotante.id,
        nome: nome || adotante.nome,
        email: email || adotante.email,
        telefone: telefone || adotante.telefone,
        endereco: endereco || adotante.endereco,
        isAdmin: isAdmin !== undefined ? isAdmin : adotante.isAdmin,
      });

      // Se uma nova senha for fornecida, criptografa
      if (senha) {
        await updatedAdotante.setSenha(senha);
      } else {
        updatedAdotante.senha = adotante.senha; // Mantém a senha antiga
      }

      const adotanteAtualizado = await prisma.adotante.update({
        where: { id: parseInt(id, 10) },
        data: {
          nome: updatedAdotante.nome,
          email: updatedAdotante.email,
          telefone: updatedAdotante.telefone,
          endereco: updatedAdotante.endereco,
          senha: updatedAdotante.senha,
          isAdmin: updatedAdotante.isAdmin,
        },
      });
      res.status(200).json(new Adotante(adotanteAtualizado));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o Adotante.' });
    }
  }

  // Delete - Remover Adotante por ID
  static async deleteAdotante(req, res) {
    const { id } = req.params;

    try {
      await prisma.adotante.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir o Adotante.' });
    }
  }
}

export default AdotanteController;
