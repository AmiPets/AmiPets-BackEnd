import express from 'express';
import AdocaoController from '../controllers/adocaoController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Adoção 
 *   description: Gerenciamento das adoções de pets
 */

/**
 * @swagger
 * /adocao:
 *   post:
 *     summary: Cria uma nova adoção
 *     tags: [Adoção]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adotanteId:
 *                 type: integer
 *                 description: ID do adotante
 *                 example: 1
 *               petId:
 *                 type: integer
 *                 description: ID do pet sendo adotado
 *                 example: 1
 *     responses:
 *       201:
 *         description: Adoção criada com sucesso
 *       400:
 *         description: Erro nos dados enviados
 *       401:
 *         description: Não autorizado
 */
router.post('/adocao', requireAuth, AdocaoController.createAdocao);

/**
 * @swagger
 * /adocao:
 *   get:
 *     summary: Retorna todas as adoções
 *     tags: [Adoção]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as adoções
 *       401:
 *         description: Não autorizado
 */
router.get('/adocao', requireAuth, AdocaoController.getAllAdocoes);

/**
 * @swagger
 * /adocao/{id}:
 *   get:
 *     summary: Retorna uma adoção específica pelo ID
 *     tags: [Adoção]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da adoção
 *     responses:
 *       200:
 *         description: Dados da adoção encontrada
 *       404:
 *         description: Adoção não encontrada
 *       401:
 *         description: Não autorizado
 */
router.get('/adocao/:id', requireAuth, AdocaoController.getAdocaoById);

/**
 * @swagger
 * /adocao/{id}:
 *   put:
 *     summary: Atualiza uma adoção existente pelo ID
 *     tags: [Adoção]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da adoção a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adotanteId:
 *                 type: integer
 *                 description: ID do adotante
 *                 example: 1
 *               petId:
 *                 type: integer
 *                 description: ID do pet sendo adotado
 *                 example: 1
 *     responses:
 *       200:
 *         description: Adoção atualizada com sucesso
 *       400:
 *         description: Erro nos dados enviados
 *       404:
 *         description: Adoção não encontrada
 *       401:
 *         description: Não autorizado
 */
router.put('/adocao/:id', requireAuth, AdocaoController.updateAdocao);


/**
 * @swagger
 * /adocao/pet/{petId}:
 *   get:
 *     summary: Retorna a adoção de um pet específico pelo ID do pet
 *     tags: [Adoção]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Dados da adoção do pet encontrado
 *       404:
 *         description: Pet não está em adoção
 *       401:
 *         description: Não autorizado
 */
router.get('/adocao/pet/:petId', requireAuth, AdocaoController.getAdocaoByPetId);

/**
 * @swagger
 * /adocao/{id}:
 *   delete:
 *     summary: Deleta uma adoção pelo ID
 *     tags: [Adoção]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da adoção a ser deletada
 *     responses:
 *       204:
 *         description: Adoção deletada com sucesso
 *       404:
 *         description: Adoção não encontrada
 *       401:
 *         description: Não autorizado
 */

router.delete('/adocao/:id', requireAuth, AdocaoController.deleteAdocao);

export default router;
