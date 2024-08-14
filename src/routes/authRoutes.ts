import express from 'express';
import { registerHandler, loginHandler, emailConfirmationHandler, googleLoginHandler, logoutHandler } from '../controllers/authController';
import { registerValidation, loginValidation } from '../validations/authValidation';

const router = express.Router();

router.post('/register', registerValidation, registerHandler);
router.get('/email-confirmation', emailConfirmationHandler);
router.post('/login', loginValidation, loginHandler);
router.post('/google/login', googleLoginHandler)
router.get('/logout', logoutHandler)

export default router;
