import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import petRoutes from './routes/petRoutes.js';
import adotanteRoutes from './routes/adotanteRoutes.js';
import adocaoRoutes from './routes/adocaoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import setupSwagger from './utils/swaggerConfig.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

setupSwagger(app);

app.use(express.json());

// Rotas da API
app.use('/api', petRoutes);
app.use('/api', adotanteRoutes);
app.use('/api', adocaoRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
