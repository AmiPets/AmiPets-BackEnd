// src/routes/adotanteRoutes.js
import express from 'express';
import AdotanteController from '../controllers/adotanteController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Adotante
 *   description: Gerenciamento dos adotantes
 */

/**
 * @swagger
 * /adotante/{id}:
 *   get:
 *     summary: Retorna os detalhes de um adotante específico
 *     tags: [Adotante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do adotante
 *     responses:
 *       200:
 *         description: Dados do adotante encontrado
 *       404:
 *         description: Adotante não encontrado
 *       401:
 *         description: Não autorizado
 */

router.get('/adotante/', requireAuth, AdotanteController.getAdotante);

router.get('/adotante/:id', requireAuth, AdotanteController.getAdotanteById);

/**
 * @swagger
 * /adotante/{id}:
 *   put:
 *     summary: Atualiza os dados de um adotante pelo ID
 *     tags: [Adotante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do adotante a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do adotante
 *                 example: "Maria Silva"
 *               telefone:
 *                 type: string
 *                 description: Telefone do adotante
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Dados do adotante atualizados com sucesso
 *       400:
 *         description: Erro nos dados enviados
 *       404:
 *         description: Adotante não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/adotante/:id', requireAuth, AdotanteController.updateAdotante);

/**
 * @swagger
 * /adotante/{id}:
 *   delete:
 *     summary: Deleta um adotante pelo ID
 *     tags: [Adotante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do adotante a ser deletado
 *     responses:
 *       204:
 *         description: Adotante deletado com sucesso
 *       404:
 *         description: Adotante não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/adotante/:id', requireAuth, AdotanteController.deleteAdotante);

export default router;