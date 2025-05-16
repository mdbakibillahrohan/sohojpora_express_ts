import express from 'express';
import authRouter from '../modules/auth/routes/auth.routes';
import userModuleRouter from '../modules/user/routes/user.routes';
import { authenticateToken } from '../shared/middleware/auth/authenticateToken';

const router = express.Router();
// Import other routers as needed


router.use('/api/auth', authRouter);

//registering userModuleRouter
router.use('/api/', authenticateToken, userModuleRouter);

export default router;
