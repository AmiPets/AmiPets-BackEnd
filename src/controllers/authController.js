import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../services/jwtService.js';

const prisma = new PrismaClient();

const signUp = async (req, res) => {
  const { nome, email, telefone, endereco, senha } = req.body;

  try {
    const existingUser = await prisma.adotante.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newAdotante = await prisma.adotante.create({
      data: {
        nome,
        email,
        telefone,
        endereco,
        senha: hashedPassword,
      },
    });

    const { senha: _, ...adotanteData } = newAdotante;

    return res.status(201).json(adotanteData);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const adotante = await prisma.adotante.findUnique({
      where: { email }
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
  signUp
};