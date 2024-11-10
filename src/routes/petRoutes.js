// src/routes/PetRoutes.js
import express from 'express';
import PetController from '../controllers/petController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Gerenciamento dos registros de pets para adoção
 */

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Adiciona um novo pet para adoção
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do pet
 *                 example: "Max"
 *               idade:
 *                 type: integer
 *                 description: Idade do pet
 *                 example: 2
 *               tipo:
 *                 type: string
 *                 description: Tipo do pet (ex. cão, gato)
 *                 example: "cão"
 *               raca:
 *                 type: string
 *                 description: Raça do pet
 *                 example: "Labrador"
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *       400:
 *         description: Dados do pet inválidos
 */
router.post('/pets', requireAuth, PetController.createPet);

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Retorna a lista de todos os pets disponíveis para adoção
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pets
 */
router.get('/pets', requireAuth, PetController.getPets);


/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Retorna um pet específico pelo ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Dados do pet
 *       404:
 *         description: Pet não encontrado
 */
router.get('/pets/:id', requireAuth, PetController.getPetById);

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Atualiza os dados de um pet específico
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do pet
 *               idade:
 *                 type: integer
 *                 description: Idade do pet
 *               tipo:
 *                 type: string
 *                 description: Tipo do pet (ex. cão, gato)
 *               raca:
 *                 type: string
 *                 description: Raça do pet
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *       404:
 *         description: Pet não encontrado
 *       400:
 *         description: Dados de atualização inválidos
 */
router.put('/pets/:id', requireAuth, PetController.updatePet);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Remove um pet específico pelo ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       204:
 *         description: Pet removido com sucesso
 *       404:
 *         description: Pet não encontrado
 */
router.delete('/pets/:id', requireAuth, PetController.deletePet);

export default router;
