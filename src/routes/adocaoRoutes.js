import express from 'express';
import AdocaoController from '../controllers/adocaoController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

router.post('/adocao', requireAuth, AdocaoController.createAdocao);
router.get('/adocao', requireAuth, AdocaoController.getAllAdocoes);
router.get('/adocao/:id', requireAuth, AdocaoController.getAdocaoById);
router.put('/adocao/:id', requireAuth, AdocaoController.updateAdocao);
router.delete('/adocao/:id', requireAuth, AdocaoController.deleteAdocao);

export default router;
