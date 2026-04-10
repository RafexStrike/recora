// File: src/module/livekit/livekit.service.ts
import { AccessToken } from 'livekit-server-sdk';

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || '';
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || '';
const LIVEKIT_URL = process.env.LIVEKIT_URL || '';

export const LiveKitService = {
  /**
   * Generate a LiveKit JWT for a participant joining a room.
   * @param roomName  - The LiveKit room name (= studio slug)
   * @param identity  - A unique identifier for the participant
   * @param isAdmin   - Whether the participant is the room host
   * @param displayName - Human-readable name shown in the UI
   */
  async generateToken(
    roomName: string,
    identity: string,
    isAdmin: boolean,
    displayName: string
  ): Promise<string> {
    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity,
      name: displayName,
      ttl: '4h',
    });

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      roomAdmin: isAdmin,
    });

    const token = await at.toJwt();
    console.log(`[LiveKit] Token generated for identity="${identity}" room="${roomName}" isAdmin=${isAdmin}`);
    return token;
  },

  getLivekitUrl(): string {
    return LIVEKIT_URL;
  },
};
