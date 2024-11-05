import express from 'express';
import petRoutes from './routes/pet.routes.js';
import adotanteRoutes from './routes/adotante.routes.js';
import adocaoRoutes from './routes/adocao.routes.js';

const app = express();
app.use(express.json());
app.use('/api', petRoutes);
app.use('/api', adotanteRoutes);
app.use('/api', adocaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando na porta localhost:${PORT}`),
);
