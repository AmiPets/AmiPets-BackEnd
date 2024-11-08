import { PrismaClient } from '@prisma/client';
import Pet from '../entities/pet.js';

const prisma = new PrismaClient();

class PetController {
  // Create - Criar um novo pet
  static async createPet(req, res) {
    const {
      nome,
      especie,
      dataNascimento,
      descricao,
      tamanho,
      personalidade,
      foto,
    } = req.body;

    try {
      const newPet = await prisma.pet.create({
        data: {
          nome,
          especie,
          dataNascimento,
          descricao,
          tamanho,
          personalidade,
          foto,
        },
      });
      res.status(201).json(new Pet(newPet));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o pet.' });
    }
  }

  // Read - Obter todos os pets
  static async getAllPets(req, res) {
    try {
      const pets = await prisma.pet.findMany();
      res.status(200).json(pets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar os pets.' });
    }
  }

  // Read - Obter pet por ID
  static async getPetById(req, res) {
    const { id } = req.params;

    try {
      const pet = await prisma.pet.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (pet) {
        res.status(200).json(pet);
      } else {
        res.status(404).json({ error: 'Pet não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o pet.' });
    }
  }

  // Update - Atualizar pet por ID
  static async updatePet(req, res) {
    const { id } = req.params;
    const {
      nome,
      especie,
      dataNascimento,
      descricao,
      tamanho,
      personalidade,
      foto,
    } = req.body;

    try {
      const updatedPet = await prisma.pet.update({
        where: { id: parseInt(id, 10) },
        data: {
          nome,
          especie,
          dataNascimento,
          descricao,
          tamanho,
          personalidade,
          foto,
        },
      });
      res.status(200).json(updatedPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o pet.' });
    }
  }

  // Delete - Remover pet por ID
  static async deletePet(req, res) {
    const { id } = req.params;

    try {
      await prisma.pet.delete({
        where: { id: parseInt(id, 10) },
      });
      res.status(204).send(); // Resposta sem conteúdo
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir o pet.' });
    }
  }
}

export default PetController;
