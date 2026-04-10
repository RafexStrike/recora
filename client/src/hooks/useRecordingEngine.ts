import { useState, useRef, useEffect, useCallback } from 'react';
import { localDb } from '../lib/db';

interface UseRecordingEngineProps {
  trackId: string;
}

export function useRecordingEngine({ trackId }: UseRecordingEngineProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunkIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const uploadLoopRef = useRef<boolean>(false);

  // Background Uploader logic
  const uploadPendingChunks = useCallback(async () => {
    if (uploadLoopRef.current) return;
    uploadLoopRef.current = true;

    try {
      while (true) {
        // Grab one pending chunk sequentially
        const pendingChunk = await localDb.chunks
          .where('status')
          .equals('pending')
          .filter(chunk => chunk.trackId === trackId)
          .first();

        if (!pendingChunk) {
          break; // Nothing pending left right now
        }

        console.log(`[Uploader] Attempting to upload chunk #${pendingChunk.chunkIndex}`);

        const formData = new FormData();
        formData.append('trackId', pendingChunk.trackId);
        formData.append('chunkIndex', pendingChunk.chunkIndex.toString());
        formData.append('blob', pendingChunk.blob, `chunk_${pendingChunk.chunkIndex}.webm`);

        // We use the full API URL just in case, but relative usually works if next.js rewrites.
        // Assuming Next.js runs on 3000 and the backend might run on another port, typically 5000. 
        // We'll use relative and let CORS/Next middleware handle it, or hardcode environment var 
        // For MVP, we'll hit http://localhost:5000/api/recording/upload-chunk 
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        const response = await fetch(`${backendUrl}/api/recording/upload-chunk`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok || response.status === 409) {
          // Success or already exists (409) means we can mark it done
          await localDb.chunks.update(pendingChunk.id!, { status: 'uploaded' });
          console.log(`[Uploader] Chunk #${pendingChunk.chunkIndex} successfully synced to server.`);
        } else {
          console.warn(`[Uploader] Upload failed for chunk #${pendingChunk.chunkIndex}, status: ${response.status}. Will retry.`);
          break; // Stop loop to avoid spamming. The interval will retry it.
        }
      }
    } catch (err: any) {
      console.warn(`[Uploader] Upload network error: ${err.message}. Will retry.`);
    } finally {
      uploadLoopRef.current = false;
    }
  }, [trackId]);

  // Uploader Polling interval (acts as background worker)
  useEffect(() => {
    const uploaderInterval = setInterval(() => {
      uploadPendingChunks();
    }, 2000); // Poll every 2 seconds for pending chunks

    return () => clearInterval(uploaderInterval);
  }, [uploadPendingChunks]);

  const startRecording = useCallback(async (stream: MediaStream) => {
    if (isRecording) return;
    
    // reset counters
    chunkIndexRef.current = 0;
    setRecordingTime(0);

    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8,opus' });
    mediaRecorderRef.current = recorder;

    console.log(`[LocalStore] Starting MediaRecorder for track ${trackId}`);

    recorder.ondataavailable = async (e) => {
      if (e.data && e.data.size > 0) {
        const index = chunkIndexRef.current++;
        await localDb.chunks.add({
          trackId,
          chunkIndex: index,
          blob: e.data,
          status: 'pending',
          createdAt: Date.now(),
        });
        console.log(`[LocalStore] Chunk #${index} saved to IndexedDB.`);
      }
    };

    recorder.start(5000);
    setIsRecording(true);

    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

  }, [isRecording, trackId]);

  const stopRecording = useCallback(() => {
    if (!mediaRecorderRef.current || !isRecording) return;
    
    console.log(`[LocalStore] Stopping MediaRecorder for track ${trackId}`);
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Trigger an immediate upload pass after stopping
    setTimeout(uploadPendingChunks, 500);

  }, [isRecording, trackId, uploadPendingChunks]);

  return {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
  };
}
