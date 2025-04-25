import express from 'express';
import authRouter from '../modules/auth/routes/auth.routes';

const router = express.Router();
// Import other routers as needed


router.use('/api/auth', authRouter);

export default router;
