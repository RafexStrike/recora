// File: client/src/hooks/useSyncedRecording.ts
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Room, RoomEvent } from 'livekit-client';
import { useRecordingEngine } from './useRecordingEngine';

// Message types sent via LiveKit DataChannel
export const SYNC_MESSAGES = {
  START_RECORDING: 'START_RECORDING',
  STOP_RECORDING: 'STOP_RECORDING',
} as const;

interface UseSyncedRecordingProps {
  trackId: string;
  room: Room | null;
  isHost: boolean;
  recordingStream: MediaStream | null;
}

export function useSyncedRecording({
  trackId,
  room,
  isHost,
  recordingStream,
}: UseSyncedRecordingProps) {
  const { isRecording, recordingTime, startRecording, stopRecording, hasPendingChunks } =
    useRecordingEngine({ trackId });
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Start countdown then trigger recording
  const beginCountdownAndRecord = useCallback(async () => {
    if (!recordingStream) return;

    setCountdown(3);

    let count = 3;
    countdownTimerRef.current = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(countdownTimerRef.current!);
        setCountdown(null);
        startRecording(recordingStream);
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [recordingStream, startRecording]);

  // Listen for data messages from the room
  useEffect(() => {
    if (!room) return;

    const handleData = (payload: Uint8Array) => {
      try {
        const msg = JSON.parse(new TextDecoder().decode(payload));

        if (msg.type === SYNC_MESSAGES.START_RECORDING) {
          console.log('[Sync] Received START_RECORDING signal from Host');
          console.log('[Uploader] Starting background upload for Guest Track...');
          beginCountdownAndRecord();
        } else if (msg.type === SYNC_MESSAGES.STOP_RECORDING) {
          console.log('[Sync] Received STOP_RECORDING signal from Host');
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            setCountdown(null);
          }
          stopRecording();
        }
      } catch (e) {
        // Ignore non-JSON data packets
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room, beginCountdownAndRecord, stopRecording]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  // HOST ONLY: broadcast start to all participants (including self)
  const broadcastStart = useCallback(async () => {
    if (!room || !isHost) return;

    const msg = JSON.stringify({ type: SYNC_MESSAGES.START_RECORDING });
    const encoded = new TextEncoder().encode(msg);
    await room.localParticipant.publishData(encoded, { reliable: true });

    // Also trigger on host side
    console.log('[Sync] Host broadcasting START_RECORDING');
    beginCountdownAndRecord();
  }, [room, isHost, beginCountdownAndRecord]);

  // HOST ONLY: broadcast stop
  const broadcastStop = useCallback(async () => {
    if (!room || !isHost) return;

    const msg = JSON.stringify({ type: SYNC_MESSAGES.STOP_RECORDING });
    const encoded = new TextEncoder().encode(msg);
    await room.localParticipant.publishData(encoded, { reliable: true });

    console.log('[Sync] Host broadcasting STOP_RECORDING');
    stopRecording();
  }, [room, isHost, stopRecording]);

  return {
    isRecording,
    recordingTime,
    countdown,
    hasPendingChunks,
    broadcastStart,
    broadcastStop,
  };
}
