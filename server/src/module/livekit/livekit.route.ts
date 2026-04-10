// File: src/module/livekit/livekit.route.ts
import { Router } from 'express';
import { LiveKitController } from './livekit.controller';

const livekitRouter = Router();

// POST /api/rooms/join — No auth guard; controller handles host vs guest logic
livekitRouter.post('/join', LiveKitController.joinRoom);

export default livekitRouter;
