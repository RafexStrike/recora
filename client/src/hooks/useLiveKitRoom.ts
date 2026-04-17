// File: client/src/hooks/useLiveKitRoom.ts
'use client';

import { useState, useCallback } from 'react';

interface LiveKitRoomInfo {
  token: string;
  url: string;
  identity: string;
  displayName: string;
  isHost: boolean;
  roomName: string;
  status: string;
}

interface UseLiveKitRoomReturn {
  roomInfo: LiveKitRoomInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchToken: (slug: string, displayName?: string) => Promise<LiveKitRoomInfo>;
}

export function useLiveKitRoom(): UseLiveKitRoomReturn {
  const [roomInfo, setRoomInfo] = useState<LiveKitRoomInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = useCallback(async (slug: string, displayName?: string): Promise<LiveKitRoomInfo> => {
    setIsLoading(true);
    setError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${backendUrl}/api/rooms/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send session cookie for host detection
        body: JSON.stringify({ roomId: slug, displayName }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to join room');
      }

      const data: LiveKitRoomInfo = await response.json();
      setRoomInfo(data);

      const role = data.isHost ? 'Host' : 'Guest';
      console.log(`[LiveKit] Joined room as ${role} | identity="${data.identity}" room="${data.roomName}"`);

      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Unknown error';
      setError(errorMessage);
      console.error('[LiveKit] Failed to fetch token:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { roomInfo, isLoading, error, fetchToken };
}
