import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/verify-otp', authController.verifyOTP); 

export default router;
