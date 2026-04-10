// File: src/module/livekit/livekit.controller.ts
import { Request, Response, NextFunction } from 'express';
import { LiveKitService } from './livekit.service';
import { auth } from '../../lib/auth';
import { v4 as uuidv4 } from 'uuid';

export const LiveKitController = {
  /**
   * POST /api/rooms/join
   * Body: { slug: string, displayName?: string }
   *
   * If the request has a valid better-auth session → Host token (isAdmin: true).
   * If no session (guest) → Guest token (isAdmin: false), displayName is required.
   */
  async joinRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug, displayName } = req.body as { slug: string; displayName?: string };

      if (!slug) {
        res.status(400).json({ error: 'slug is required' });
        return;
      }

      // Try to get authenticated user from better-auth session
      const session = await auth.api.getSession({ headers: req.headers as any });
      const isAuthenticated = !!session?.user;

      let identity: string;
      let name: string;
      let isAdmin: boolean;

      if (isAuthenticated) {
        // Authenticated user → Host
        identity = session!.user.id;
        name = session!.user.name || session!.user.email || 'Host';
        isAdmin = true;
        console.log(`[LiveKit] Authenticated user ${identity} joining room "${slug}" as Host`);
      } else {
        // Guest
        if (!displayName || displayName.trim().length < 1) {
          res.status(400).json({ error: 'displayName is required for guest participants' });
          return;
        }
        identity = `guest-${uuidv4()}`;
        name = displayName.trim();
        isAdmin = false;
        console.log(`[LiveKit] Guest "${name}" (${identity}) joining room "${slug}" as Guest`);
      }

      const token = await LiveKitService.generateToken(slug, identity, isAdmin, name);
      const url = LiveKitService.getLivekitUrl();

      res.status(200).json({
        token,
        url,
        identity,
        displayName: name,
        isAdmin,
        roomName: slug,
      });
    } catch (error) {
      next(error);
    }
  },
};
