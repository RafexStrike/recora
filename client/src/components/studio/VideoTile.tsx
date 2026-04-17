// File: client/src/components/studio/VideoTile.tsx
'use client';

import { RefObject, useEffect, useLayoutEffect } from 'react';
import { VideoOff } from 'lucide-react';
import { CountdownOverlay } from './CountdownOverlay';

interface VideoTileProps {
  videoRef?: RefObject<HTMLVideoElement | null>;
  stream?: MediaStream | null;
  name: string;
  isHost?: boolean;
  isRecording: boolean;
  isSelf?: boolean;
  isCamEnabled?: boolean;
  countdown?: number | null;
  muted?: boolean;
}

export function VideoTile({
  videoRef,
  stream,
  name,
  isHost = false,
  isRecording,
  isSelf = false,
  isCamEnabled = true,
  countdown = null,
  muted = false,
}: VideoTileProps) {
  
  // Debug: log render
  useEffect(() => {
    console.log('[VideoTile] Rendered', { name, isSelf, hasStream: !!stream, isCamEnabled });
    return () => {
      console.log('[VideoTile] Unmounting', { name, isSelf });
    };
  }, [name, isSelf]);
  
  // Synchronous layout effect to attach stream before paint
  useLayoutEffect(() => {
    const video = videoRef?.current;
    if (!video || !stream) {
      if (video && !stream) {
        video.srcObject = null;
      }
      return;
    }
    
    if (video.srcObject !== stream) {
      console.log('[VideoTile] Attaching stream to video element', { 
        name, 
        isSelf,
        streamTracks: stream.getVideoTracks().length,
      });
      video.srcObject = stream;
    }
  }, [stream, videoRef]);

  // Log stream status periodically for debugging
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef?.current && stream) {
        const videoTrack = stream.getVideoTracks()[0];
        console.log('[VideoTile Debug] Stream Status:', {
          name,
          isSelf,
          srcObjectSet: !!videoRef.current.srcObject,
          trackReady: videoTrack?.readyState === 'live',
          trackEnabled: videoTrack?.enabled,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [stream, videoRef, name, isSelf]);

  return (
    <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted || isSelf}
        className={`w-full h-full object-cover ${isSelf ? 'scale-x-[-1]' : ''} transition-opacity duration-200 ${!isCamEnabled ? 'opacity-0' : 'opacity-100'}`}
        onPlay={() => console.log('[VideoTile] Video playing:', { name, isSelf })}
        onLoadedMetadata={() => console.log('[VideoTile] Metadata loaded:', { name, isSelf })}
        onError={(e) => console.error('[VideoTile] Video error:', { name, isSelf, error: (e.target as any)?.error })}
      />

      {!isCamEnabled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <VideoOff className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      )}

      {/* Countdown overlay */}
      <CountdownOverlay count={countdown} />

      {/* 🔴 RECORDING badge */}
      {isRecording && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          REC
        </div>
      )}

      {/* Host badge */}
      {isHost && (
        <div className="absolute top-3 right-3 z-10 bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
          👑 Host
        </div>
      )}

      {/* Name label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-sm font-medium text-white">
          {name}
          {isSelf && <span className="text-gray-400 text-xs ml-1">(You)</span>}
        </span>
      </div>
    </div>
  );
}
