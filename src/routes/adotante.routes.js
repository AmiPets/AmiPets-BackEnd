// src/routes/AdotanteRoutes.js
import express from 'express';
import AdotanteController from '../controladores/adotante.controller.js';

const router = express.Router();

router.post('/Adotantes', AdotanteController.createAdotante);
router.get('/Adotantes', AdotanteController.getAllAdotantes);
router.get('/Adotantes/:id', AdotanteController.getAdotanteById);
router.put('/Adotantes/:id', AdotanteController.updateAdotante);
router.delete('/Adotantes/:id', AdotanteController.deleteAdotante);

// Outras rotas podem ser adicionadas aqui...

// Exporte o roteador como exportação padrão
export default router;
