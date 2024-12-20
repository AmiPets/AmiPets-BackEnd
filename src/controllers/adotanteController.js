import { prismaClient } from '../database/prismaClient.js';
import Adotante from '../entities/adotante.js';

class AdotanteController {
  // Read - Obter Adotante por ID
  static async getAdotanteById(req, res) {
    const { id } = req.params;

    try {
      const adotante = await prismaClient.adotante.findUnique({
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
  }

  // Read - Obter todos os Adotantes
  static async getAdotante(req, res) {

    let { offset, limit } = req.query;

    offset = (offset && !isNaN(Number(offset)) ? Number(offset) : 0);
    limit = (limit && !isNaN(Number(limit)) ? Number(limit) : 50);
    
    try {
      const adotantes = await prismaClient.adotante.findMany({
        skip: offset,
        take: limit
      })
      return res.status(200).json(adotantes)
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

  // Update - Atualizar Adotante por ID
  static async updateAdotante(req, res) {
    const { id } = req.params;
    const { nome, email, telefone, endereco, senha, isAdmin } = req.body;
  
    try {
      const adotante = await prismaClient.adotante.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!adotante) {
        return res.status(404).json({ error: 'Adotante não encontrado.' });
      }
  
      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }
  
      if (isAdmin !== undefined && !req.user.isAdmin) {
        return res.status(403).json({ error: 'Você não tem permissão para alterar o campo "isAdmin".' });
      }
  
      const updatedAdotante = new Adotante({
        id: adotante.id,
        nome: nome || adotante.nome,
        email: email || adotante.email,
        telefone: telefone || adotante.telefone,
        endereco: endereco || adotante.endereco,
        isAdmin: isAdmin !== undefined ? isAdmin : adotante.isAdmin,
      });
  
      if (senha) {
        await updatedAdotante.setSenha(senha);
      } else {
        updatedAdotante.senha = adotante.senha;
      }
  
      const adotanteAtualizado = await prismaClient.adotante.update({
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
      await prismaClient.adotante.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(202).json({ message: 'Adotante excluido com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir o Adotante.' });
    }
  }
}

export default AdotanteController;
