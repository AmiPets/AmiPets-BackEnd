import { prismaClient } from '../database/prismaClient.js';
import Pet from '../entities/pet.js';
import { validateArrayJson } from '../utils/validateArrayJson.js';
import { isValidDate } from '../utils/isValidDate.js';
import { validateId } from '../utils/validateId.js';

class PetController {
  // Método para atualizar o status do pet
  static async updatePetStatus(id, newStatus) {
    try {
      const updatedPet = await prismaClient.pet.update({
        where: { id },
        data: { newStatus },
      });
      return updatedPet;
    } catch (error) {
      throw new Error('Erro ao atualizar o status do pet: ' + error.message);
    }
  }

  // Cria um novo Pet
  static async createPet(req, res) {
    let { nome, especie, dataNascimento, descricao, status, tamanho, personalidade, foto } =
      req.body;
    let errorMessages = '';

    if (!nome) {
      errorMessages += 'O nome deve ser incluído na requisição! ';
    }
    if (!especie) {
      errorMessages += 'A espécie deve ser incluída na requisição! ';
    }
    if (!dataNascimento) {
      errorMessages += 'A data de nascimento deve ser incluído na requisição! ';
    } else {
      if (!isValidDate(new Date(dataNascimento))) {
        errorMessages += 'A data deve possuir um formato válido! ';
      }
    }

    if (tamanho) {
      tamanho = tamanho
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    }

    if (errorMessages) {
      errorMessages = errorMessages.trim();
      return res.status(400).json({ message: 'Erro ao inserir Pet!', error: errorMessages });
    }

    try {
      const newPet = await prismaClient.pet.create({
        data: {
          nome,
          dataNascimento: new Date(dataNascimento),
          especie,
          descricao,
          status,
          tamanho,
          personalidade,
          foto,
        },
      });
      return res
        .status(201)
        .json({ message: 'Pet cadastrado com sucesso!', newPet: new Pet(newPet) });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao cadastrar Pet!', error: error.message });
    }
  }

  // Atualiza Pet
  static async updatePet(req, res) {
    const { isIdValid, id, messageErrorId } = validateId(req.params.id);

    if (!isIdValid) {
      return res.status(400).json({ message: messageErrorId });
    }

    const { nome, especie, descricao, status, tamanho, personalidade, foto } = req.body;
    let { dataNascimento } = req.body;

    if (dataNascimento) {
      if (isValidDate(new Date(dataNascimento))) {
        dataNascimento = new Date(dataNascimento);
      } else {
        return res.status(400).json({ message: 'A data deve possuir um formato válido!' });
      }
    }

    try {
      const updatedPet = await prismaClient.pet.update({
        where: {
          id,
        },
        data: {
          nome,
          dataNascimento,
          especie,
          descricao,
          status,
          tamanho,
          personalidade,
          foto,
        },
      });

      return res.status(200).json({ message: 'Pet alterado com sucesso!', updatedPet });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Pet não encontrado com o id informado!' });
      } else {
        return res.status(500).json({ message: 'Erro ao atualizar pet!', error: error.message });
      }
    }
  }

  // Seleciona Pet por id
  static async getPetById(req, res) {
    const { isIdValid, id, messageErrorId } = validateId(req.params.id);

    if (!isIdValid) {
      return res.status(400).json({ message: messageErrorId });
    }

    try {
      const selectedPet = await prismaClient.pet.findUnique({
        where: {
          id,
        },
      });

      if (!selectedPet) {
        return res.status(404).json({ message: 'Pet não encontrado com o id informado!' });
      }

      return res.status(200).json(new Pet(selectedPet));
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao encontrar pet!', error: error.message });
    }
  }

  // Seleciona os pets por parâmetros query
  static async getPets(req, res) {
    let { offset, limit, especie, status, tamanho, personalidade, nome } = req.query;

    offset = offset && !isNaN(Number(offset)) ? Number(offset) : 0;
    limit = limit && !isNaN(Number(limit)) ? Number(limit) : 15;

    if (personalidade) {
      try {
        personalidade = JSON.parse(personalidade);
        if (!Array.isArray(personalidade)) {
          return res.status(400).json({ message: 'Personalidade deve ser um array válido.' });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Erro ao processar o campo 'personalidade'.", error: error.message });
      }
    } else {
      personalidade = [];
    }

    if (especie) {
      try {
        especie = JSON.parse(especie);
        if (!Array.isArray(especie)) {
          return res.status(400).json({ message: 'Espécie deve ser um array válido.' });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Erro ao processar o campo 'especie'.", error: error.message });
      }
    } else {
      especie = [];
    }

    if (status) {
      try {
        status = JSON.parse(status);
        if (!Array.isArray(status)) {
          return res.status(400).json({ message: 'Status deve ser um array válido.' });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Erro ao processar o campo 'status'.", error: error.message });
      }
    } else {
      status = [];
    }

    if (tamanho) {
      try {
        tamanho = JSON.parse(tamanho);
        if (!Array.isArray(tamanho)) {
          return res.status(400).json({ message: 'Tamanho deve ser um array válido.' });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Erro ao processar o campo 'tamanho'.", error: error.message });
      }
    } else {
      tamanho = [];
    }

    try {
      const allPets = await prismaClient.pet.findMany({
        skip: offset,
        take: limit,
        where: {
          nome: {
            contains: nome,
            mode: 'insensitive'
          },
          ... (especie.length > 0 && {
            especie: {
              in: especie
            }
          }),
          ... (status.length > 0 && {
            status: {
              in: status
            }
          }),
          ... (tamanho.length > 0 && {
            tamanho: {
              in: tamanho
            }
          }),
          ...(personalidade.length > 0 && {
            personalidade: {
              hasEvery: personalidade,
            },
          }),
        },
      });

      return res.status(200).json(allPets);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao encontrar pets!', error: error.message });
    }
  }

  // Deleta um Pet por id
  static async deletePet(req, res) {
    const { isIdValid, id, messageErrorId } = validateId(req.params.id);

    if (!isIdValid) {
      return res.status(400).json({ message: messageErrorId });
    }

    try {
      const selectedPet = await prismaClient.pet.findUnique({
        where: {
          id,
        },
      });

      if (!selectedPet) {
        return res.status(404).json({ message: 'Pet não encontrado com o id informado!' });
      }

      const deletedPet = await prismaClient.pet.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({ message: 'Pet excluído com sucesso!', deletedPet });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir pet!', error: error.message });
    }
  }
}

export default PetController;
