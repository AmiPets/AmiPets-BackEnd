import jwt from 'jsonwebtoken';
import { prismaClient } from '../database/prismaClient.js';

export const generateToken = async (userId, email) => {
  try {
    const user = await prismaClient.adotante.findUnique({
      where: { id: userId },
      select: { email: true, isAdmin: true },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    console.log('Usuário encontrado:', user);

    const token = jwt.sign(
      { userId, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Token gerado:', token);

    return token;
  } catch (error) {
    console.error('Erro na geração do token:', error);
    throw error;
  }
};
