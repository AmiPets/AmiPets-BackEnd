// src/routes/PetRoutes.js
import express from 'express';
import PetController from '../controladores/pet.controller.js';

const router = express.Router();

router.post('/pets', PetController.createPet);
router.get('/pets', PetController.getAllPets);
router.get('/pets/:id', PetController.getPetById);
router.put('/pets/:id', PetController.updatePet);
router.delete('/pets/:id', PetController.deletePet);

// Outras rotas podem ser adicionadas aqui...

// Exporte o roteador como exportação padrão
export default router;
