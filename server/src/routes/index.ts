// File: server/src/routes/index.ts
import { Router } from 'express';
import userRouter from '../module/user/user.route';
import authRouter from '../module/auth/auth.route';
import recordingRouter from '../module/recording/recording.route';
import livekitRouter from '../module/livekit/livekit.route';

const routes = Router();

// Module Routes
routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/recording', recordingRouter);
routes.use('/rooms', livekitRouter);

// Health check endpoint
routes.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

export default routes;
