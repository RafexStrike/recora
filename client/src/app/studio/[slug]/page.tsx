'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import {
  Room,
  RoomEvent,
  RemoteParticipant,
  ParticipantEvent,
  Track,
} from 'livekit-client';
import '@livekit/components-styles';
import { useLiveKitRoom } from '../../../hooks/useLiveKitRoom';
import { useSyncedRecording } from '../../../hooks/useSyncedRecording';
import { VideoTile } from '../../../components/studio/VideoTile';
import { GreenRoomModal } from '../../../components/studio/GreenRoomModal';
import { Mic, MicOff, Video, VideoOff, Link2, Loader2 } from 'lucide-react';

// Wrapper to robustly attach tracks for remote participants
function RemoteVideoTile({ participant, isRecording }: { participant: RemoteParticipant; isRecording: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const el = videoRef.current;

    const attach = (track: Track) => {
      if (track.kind === Track.Kind.Video) {
        track.attach(el);
      }
    };

    // 1. If already subscribed when component mounts, attach
    participant.videoTrackPublications.forEach((pub) => {
      if (pub.isSubscribed && pub.track) attach(pub.track);
    });

    // 2. Listen for future track subscriptions on this participant
    const onSubscribed = (track: Track) => attach(track);
    participant.on(ParticipantEvent.TrackSubscribed, onSubscribed);

    return () => {
      participant.off(ParticipantEvent.TrackSubscribed, onSubscribed);
      participant.videoTrackPublications.forEach((pub) => {
        if (pub.track) pub.track.detach(el);
      });
    };
  }, [participant]);

  return (
    <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* REC badge for remote */}
      {isRecording && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          REC
        </div>
      )}

      {/* Name label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-sm font-medium text-white">
          {participant.name || participant.identity}
        </span>
      </div>
    </div>
  );
}

export default function StudioRoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const isInvite = searchParams.get('invite') === 'true';

  // LiveKit room instance stored in state so hooks can re-subscribe when it changes
  const [room, setRoom] = useState<Room | null>(null);

  // Video refs
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Participant state
  const [remoteParticipants, setRemoteParticipants] = useState<RemoteParticipant[]>([]);
  const [localName, setLocalName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Media state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [recordingStream, setRecordingStream] = useState<MediaStream | null>(null);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCamEnabled, setIsCamEnabled] = useState(true);

  // UI state
  const [showGreenRoom, setShowGreenRoom] = useState(isInvite);
  const [copySuccess, setCopySuccess] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const { fetchToken } = useLiveKitRoom();

  // Stable unique track ID per page session
  const trackId = useRef(`track-${slug}-${Date.now()}`).current;

  // Synced recording hook — re-activates whenever room is set
  const { isRecording, recordingTime, countdown, hasPendingChunks, broadcastStart, broadcastStop } =
    useSyncedRecording({
      trackId,
      room,
      isAdmin,
      recordingStream,
    });

  // Setup local camera/mic stream and clone it for recording
  const setupLocalMedia = useCallback(async (): Promise<MediaStream> => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
      audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 48000 },
    });
    setLocalStream(stream);

    // High-quality recording stream — independent clone so network degradation
    // on the LiveKit stream never affects local recording quality
    const cloned = stream.clone();
    setRecordingStream(cloned);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    return stream;
  }, []);

  // Connect to LiveKit room and publish local tracks
  const connectToRoom = useCallback(async (token: string, url: string, stream: MediaStream): Promise<Room> => {
    const livekitRoom = new Room({ adaptiveStream: true, dynacast: true });

    livekitRoom.on(RoomEvent.Connected, () => {
      console.log(`[LiveKit] Connected to room "${slug}"`);
      setIsConnected(true);
    });

    livekitRoom.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      console.log(`[LiveKit] Participant connected: ${participant.identity}`);
      setRemoteParticipants(prev => [...prev, participant]);
    });

    livekitRoom.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      console.log(`[LiveKit] Participant disconnected: ${participant.identity}`);
      setRemoteParticipants(prev => prev.filter(p => p.identity !== participant.identity));
    });

    livekitRoom.on(RoomEvent.Disconnected, () => {
      setIsConnected(false);
      console.log('[LiveKit] Disconnected from room');
    });

    await livekitRoom.connect(url, token);

    // Add any existing participants (e.g. host already in room when guest joins)
    const existing = Array.from(livekitRoom.remoteParticipants.values());
    if (existing.length > 0) {
      setRemoteParticipants(prev => {
        const fresh = existing.filter((ex) => !prev.some(p => p.identity === ex.identity));
        return [...prev, ...fresh];
      });
    }

    // Publish tracks to LiveKit for live preview (uses original stream)
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    if (audioTrack) await livekitRoom.localParticipant.publishTrack(audioTrack);
    if (videoTrack) await livekitRoom.localParticipant.publishTrack(videoTrack);

    return livekitRoom;
  }, [slug]);

  // Main join flow — handles both host auto-join and guest manual join
  const joinRoom = useCallback(async (displayName?: string) => {
    setIsJoining(true);
    setConnectError(null);

    try {
      const info = await fetchToken(slug, displayName);
      if (!info) throw new Error('Failed to get room token');

      setIsAdmin(info.isAdmin);
      setLocalName(info.displayName);

      const stream = await setupLocalMedia();
      const livekitRoom = await connectToRoom(info.token, info.url, stream);

      // Set room in state → triggers useSyncedRecording to re-subscribe
      setRoom(livekitRoom);
      setShowGreenRoom(false);

      const role = info.isAdmin ? 'Host' : 'Guest';
      console.log(`[LiveKit] Joined room as ${role} | name="${info.displayName}" room="${slug}"`);
    } catch (err: any) {
      setConnectError(err.message || 'Failed to join room');
    } finally {
      setIsJoining(false);
    }
  }, [slug, fetchToken, setupLocalMedia, connectToRoom]);

  // Auto-join if host (authenticated user, no invite param)
  useEffect(() => {
    if (!isInvite) {
      joinRoom();
    }

    return () => {
      room?.disconnect();
      localStream?.getTracks().forEach(t => t.stop());
      recordingStream?.getTracks().forEach(t => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMic = () => {
    if (!localStream) return;
    const next = !isMicEnabled;
    localStream.getAudioTracks().forEach(t => { t.enabled = next; });
    setIsMicEnabled(next);
  };

  const toggleCam = () => {
    if (!localStream) return;
    const next = !isCamEnabled;
    localStream.getVideoTracks().forEach(t => { t.enabled = next; });
    setIsCamEnabled(next);
  };

  const copyInviteLink = () => {
    const url = `${window.location.origin}/studio/${slug}?invite=true`;
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const formatTime = (s: number) => new Date(s * 1000).toISOString().substring(11, 19);

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">

      {/* Guest Green Room Modal */}
      {showGreenRoom && (
        <GreenRoomModal isLoading={isJoining} onJoin={(name) => joinRoom(name)} />
      )}

      {/* Top Header */}
      <div className="h-14 border-b border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-widest text-white">RECORA</span>
          <span className="text-gray-600 text-sm">·</span>
          <span className="text-sm text-gray-400 font-mono">{slug}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Syncing badge */}
          {hasPendingChunks && !isRecording && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full">
              <Loader2 className="w-3 h-3 animate-spin" />
              Syncing...
            </div>
          )}

          {/* Recording timer */}
          {isRecording && (
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm font-mono font-semibold">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              🔴 RECORDING {formatTime(recordingTime)}
            </div>
          )}

          {/* Copy invite link */}
          <button
            onClick={copyInviteLink}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
          >
            <Link2 className="w-4 h-4" />
            {copySuccess ? '✓ Copied!' : 'Copy Invite Link'}
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 p-6 overflow-hidden">
        {connectError && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {connectError}
          </div>
        )}

        <div
          className={`h-full grid gap-4 ${
            remoteParticipants.length > 0 ? 'grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto w-full'
          }`}
        >
          {/* Local (self) tile */}
          <VideoTile
            videoRef={localVideoRef}
            stream={localStream}
            name={localName || 'You'}
            isHost={isAdmin}
            isRecording={isRecording}
            isSelf
            isCamEnabled={isCamEnabled}
            countdown={countdown}
            muted
          />

          {/* Remote participant tiles */}
          {remoteParticipants.map((participant) => (
            <RemoteVideoTile
              key={participant.identity}
              participant={participant}
              isRecording={isRecording}
            />
          ))}

          {/* Waiting placeholder tile */}
          {isConnected && remoteParticipants.length === 0 && (
            <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-dashed border-white/15 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                  <VideoOff className="w-7 h-7 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm mb-2">Waiting for participants...</p>
                <button
                  onClick={copyInviteLink}
                  className="text-xs text-[#00f0ff]/60 hover:text-[#00f0ff] flex items-center gap-1 mx-auto transition-colors"
                >
                  <Link2 className="w-3 h-3" />
                  {copySuccess ? 'Link copied!' : 'Share invite link'}
                </button>
              </div>
            </div>
          )}

          {/* Not yet connected loading state */}
          {!isConnected && !showGreenRoom && (
            <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]/50" />
                <span className="text-sm">Connecting to studio...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Control Bar */}
      {(isConnected || isJoining) && (
        <div className="h-20 border-t border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-center gap-4 px-8 shrink-0">

          {/* Mic toggle */}
          <button
            onClick={toggleMic}
            title={isMicEnabled ? 'Mute mic' : 'Unmute mic'}
            className={`p-4 rounded-full transition-all ${
              isMicEnabled
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isMicEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Camera toggle */}
          <button
            onClick={toggleCam}
            title={isCamEnabled ? 'Turn off camera' : 'Turn on camera'}
            className={`p-4 rounded-full transition-all ${
              isCamEnabled
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isCamEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* HOST ONLY — Recording button */}
          {isAdmin && (
            <button
              onClick={() => (isRecording ? broadcastStop() : broadcastStart())}
              disabled={countdown !== null}
              className={`px-8 py-3 ml-4 rounded-full font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 border border-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
              }`}
            >
              {countdown !== null
                ? `Starting in ${countdown}...`
                : isRecording
                ? '⏹ Stop Recording'
                : '⏺ Start Recording'}
            </button>
          )}

          {/* Guest: waiting hint */}
          {!isAdmin && !isRecording && (
            <p className="ml-4 text-xs text-gray-600 italic">
              Waiting for host to start recording...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
