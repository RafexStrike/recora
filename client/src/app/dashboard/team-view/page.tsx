"use client";

import { useEffect, useRef, useState } from "react";
import { Video, VideoOff, Mic, MicOff } from "lucide-react";
import { useRecordingEngine } from "../../../hooks/useRecordingEngine";

export default function TeamViewPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const trackId = "track-demo-123";
  const { isRecording, recordingTime, startRecording, stopRecording } = useRecordingEngine({ trackId });

  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true, // we request both for a realistic green room
        });
        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err: any) {
        console.error("Error accessing media devices.", err);
        setError("Could not access camera/microphone. Please allow permissions.");
      }
    }

    setupCamera();

    return () => {
      // Cleanup stream on unmount
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col pt-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-white">Team View</h1>
      
      <div className="flex-1 flex flex-col items-center justify-center max-h-[70vh]">
        <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl flex items-center justify-center">
          {error ? (
            <div className="text-red-400 p-4 text-center">{error}</div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted // Always muted locally to prevent feedback loop
              className={`w-full h-full object-cover transition-opacity duration-300 ${!isVideoEnabled ? 'opacity-0' : 'opacity-100'}`}
            />
          )}

          {/* Timer Overlay */}
          {isRecording && (
            <div className="absolute top-4 right-4 bg-red-500/80 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
               <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
               {new Date(recordingTime * 1000).toISOString().substring(11, 19)}
            </div>
          )}

          {!isVideoEnabled && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                <VideoOff className="w-10 h-10 text-gray-400" />
              </div>
            </div>
          )}

          {/* Controls overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full transition-all ${
                isAudioEnabled 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-all ${
                isVideoEnabled 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
            
            <button
              disabled={!stream}
              onClick={() => {
                if (isRecording) stopRecording();
                else if (stream) startRecording(stream);
              }}
              className={`px-6 py-3 ml-4 rounded-full font-semibold transition-all ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 border border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : 'bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] disabled:opacity-50'
              }`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center max-w-xl">
          <h2 className="text-xl font-semibold text-white mb-2">Ready to join?</h2>
          <p className="text-gray-400 text-sm">
            Check your audio and video settings before joining the team view session.
            All processing is handled directly in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
