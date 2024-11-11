import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Gerenciamento de autenticação de usuários
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "senhaSegura123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Dados de login inválidos
 *       401:
 *         description: Credenciais incorretas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Realiza o cadastro de um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "novoUsuario@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "novaSenhaSegura123"
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: "João da Silva"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados de cadastro inválidos
 */
router.post('/signup', authController.signUp);

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verifica o código OTP enviado para o usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "usuario@example.com"
 *               otp:
 *                 type: string
 *                 description: Código OTP de verificação
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verificado com sucesso
 *       400:
 *         description: Código OTP inválido ou expirado
 */
router.post('/verify-otp', authController.verifyOTP); 

export default router;
