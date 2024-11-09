import { prismaClient } from '../database/prismaClient.js';
import bcrypt from 'bcryptjs';
import otpService from '../services/otpService.js';
import sendEmail from '../services/emailService.js';
import getWelcomeEmailTemplate from '../utils/templates/emailTemplates.js';
import { generateToken } from '../services/jwtService.js';

const tempUsers = {};

const signUp = async (req, res) => {
  const { nome, email, telefone, endereco, senha } = req.body;

  try {
    const existingUser = await prismaClient.adotante.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    tempUsers[email] = { nome, email, telefone, endereco, senha: hashedPassword };

    await otpService.sendOTP(email, nome);
    return res.status(201).json({
      message: 'Cadastro realizado. Um código OTP foi enviado para seu e-mail para verificação.',
    });
  } catch (error) {
    console.error('Erro ao criar adotante:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const { valid, message } = await otpService.verifyOTP(email, otp);
  if (!valid) return res.status(422).json({ message });

  const userData = tempUsers[email];
  if (!userData) return res.status(404).json({ message: 'Usuário não encontrado.' });

  try {
    await prismaClient.adotante.create({
      data: {
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        endereco: userData.endereco,
        senha: userData.senha,
      },
    });

    const subject = "Bem-vindo!";
    const html = getWelcomeEmailTemplate(userData.nome);
    await sendEmail(userData.email, subject, html);

    delete tempUsers[email];
    return res
      .status(201)
      .json({ message: 'Usuário verificado e cadastro concluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar o usuário:', error);
    return res.status(500).json({ message: 'Erro ao criar o usuário. Tente novamente!' });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const adotante = await prismaClient.adotante.findUnique({
      where: { email },
    });

    if (!adotante) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(senha, adotante.senha);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = generateToken(adotante.id, adotante.email);

    return res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

export default {
  login,
  signUp,
  verifyOTP,
};
