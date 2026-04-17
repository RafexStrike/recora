// File: src/module/livekit/livekit.controller.ts
import { Request, Response, NextFunction } from 'express';
import { LiveKitService } from './livekit.service';
import { auth } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export const LiveKitController = {
  /**
   * POST /api/rooms/create
   * Requires authenticated user
   */
  async createRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const session = await auth.api.getSession({ headers: req.headers as any });
      if (!session?.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const room = await prisma.room.create({
        data: {
          hostId: session.user.id,
          status: 'WAITING',
        },
      });

      res.status(201).json({
        roomId: room.id,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/rooms/join
   * Body: { roomId: string, displayName?: string }
   */
  async joinRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { roomId, displayName } = req.body as { roomId: string; displayName?: string };

      if (!roomId) {
        res.status(400).json({ error: 'roomId is required' });
        return;
      }

      // Try to get authenticated user from better-auth session
      const session = await auth.api.getSession({ headers: req.headers as any });
      const isAuthenticated = !!session?.user;

      let room = await prisma.room.findUnique({
        where: { id: roomId },
      });

      // If room doesn't exist and user is authenticated, auto-create it to maintain backward compatibility
      if (!room && isAuthenticated) {
        console.log(`[LiveKit] Room "${roomId}" not found. Auto-creating for host ${session!.user.id}`);
        room = await prisma.room.create({
          data: {
            id: roomId,
            hostId: session!.user.id,
            status: 'WAITING',
          },
        });
      }

      if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }

      if (room.status === 'ENDED') {
        res.status(400).json({ error: 'Room has ended' });
        return;
      }

      const isHost = session?.user?.id === room.hostId;

      if (room.status === 'WAITING' && !isHost) {
        res.status(403).json({ error: 'Host has not started the session yet' });
        return;
      }

      let identity: string;
      let name: string;

      if (isHost) {
        identity = session!.user.id;
        name = session!.user.name || session!.user.email || 'Host';
        console.log(`[LiveKit] Host ${identity} joining room "${roomId}"`);
      } else {
        // Guest
        if (!displayName || displayName.trim().length < 1) {
          res.status(400).json({ error: 'displayName is required for guest participants' });
          return;
        }
        identity = `guest-${uuidv4()}`;
        name = displayName.trim();
        console.log(`[LiveKit] Guest "${name}" (${identity}) joining room "${roomId}"`);
      }

      const token = await LiveKitService.generateToken(roomId, identity, isHost, name);
      const url = LiveKitService.getLivekitUrl();

      res.status(200).json({
        token,
        url,
        identity,
        displayName: name,
        isHost,
        roomName: roomId,
        status: room.status,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/rooms/:roomId/start
   * Only host can call
   */
  async startRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { roomId } = req.params;
      const session = await auth.api.getSession({ headers: req.headers as any });
      if (!session?.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const room = await prisma.room.findUnique({
        where: { id: roomId },
      });

      if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }

      if (room.hostId !== session.user.id) {
        res.status(403).json({ error: 'Only the host can start the room' });
        return;
      }

      await prisma.room.update({
        where: { id: roomId },
        data: { status: 'LIVE' },
      });

      res.status(200).json({ message: 'Room started successfully' });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/rooms/:roomId/end
   * Only host can call
   */
  async endRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { roomId } = req.params;
      const session = await auth.api.getSession({ headers: req.headers as any });
      if (!session?.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const room = await prisma.room.findUnique({
        where: { id: roomId },
      });

      if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }

      if (room.hostId !== session.user.id) {
        res.status(403).json({ error: 'Only the host can end the room' });
        return;
      }

      await prisma.room.update({
        where: { id: roomId },
        data: { status: 'ENDED' },
      });

      res.status(200).json({ message: 'Room ended successfully' });
    } catch (error) {
      next(error);
    }
  },
};
