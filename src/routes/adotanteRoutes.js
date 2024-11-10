// src/routes/adotanteRoutes.js
import express from 'express';
import AdotanteController from '../controllers/adotanteController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

router.get('/adotante/', requireAuth, AdotanteController.getAdotante);
router.get('/adotante/:id', requireAuth, AdotanteController.getAdotanteById);
router.put('/adotante/:id', requireAuth, AdotanteController.updateAdotante);
router.delete('/adotante/:id', requireAuth, AdotanteController.deleteAdotante);

export default router;
