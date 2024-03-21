import express from 'express';
import authController from '../controllers/AuthController';
import authValidation from '../validations/AuthValidation';
import validateSchema from '../middleware/validateSchema.middleware';
import authMiddleware from '../middleware/AuthMiddleware';

const router = express.Router();


router.post('/login', validateSchema(authValidation.login), authController.login);
/** Phải nằm trước id */
router.get('/profile', authMiddleware.checkToken, authController.getProfile);

/** Phải nằm trước id */
router.get('/refresh-token', authMiddleware.checkToken, authController.freshToken);


export default router;