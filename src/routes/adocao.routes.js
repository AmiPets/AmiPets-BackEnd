import express from 'express';
import adocaoController from '../controladores/adocao.controller.js';

const router = express.Router();

router.post('/adocao', adocaoController.createAdocao);
router.get('/adocao', adocaoController.getAllAdocoes);
router.get('/adocao/:id', adocaoController.getAdocaoById);
router.put('/adocao/:id', adocaoController.updateAdocao);
router.delete('/adocao/:id', adocaoController.deleteAdocao);

export default router;
