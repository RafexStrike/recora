// File: src/module/livekit/livekit.route.ts
import { Router } from 'express';
import { LiveKitController } from './livekit.controller';

const livekitRouter = Router();

// POST /api/rooms/create — Creates a new room
livekitRouter.post('/create', LiveKitController.createRoom);

// POST /api/rooms/join — No auth guard; controller handles host vs guest logic
livekitRouter.post('/join', LiveKitController.joinRoom);

// POST /api/rooms/:roomId/start — Starts the session (Host only)
livekitRouter.post('/:roomId/start', LiveKitController.startRoom);

// POST /api/rooms/:roomId/end — Ends the session (Host only)
livekitRouter.post('/:roomId/end', LiveKitController.endRoom);

export default livekitRouter;
