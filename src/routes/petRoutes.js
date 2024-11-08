// src/routes/PetRoutes.js
import express from 'express';
import PetController from '../controllers/petController.js';
import requireAuth from '../middlewares/requireAuth.js';

const router = express.Router();

router.post('/pets', requireAuth, PetController.createPet);
router.get('/pets', requireAuth, PetController.getPets);
router.get('/pets/:id', requireAuth, PetController.getPetById);
router.put('/pets/:id', requireAuth, PetController.updatePet);
router.delete('/pets/:id', requireAuth, PetController.deletePet);
router.post('/pets/search', requireAuth, PetController.searchPets);

export default router;
