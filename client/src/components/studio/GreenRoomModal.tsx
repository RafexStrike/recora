// File: client/src/components/studio/GreenRoomModal.tsx
'use client';

import { useState } from 'react';
import { Video, ArrowRight, Loader2 } from 'lucide-react';

interface GreenRoomModalProps {
  isLoading: boolean;
  onJoin: (displayName: string) => void;
}

export function GreenRoomModal({ isLoading, onJoin }: GreenRoomModalProps) {
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (displayName.trim().length < 1) return;
    onJoin(displayName.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center">
              <Video className="w-5 h-5 text-[#00f0ff]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Join Studio</h2>
              <p className="text-xs text-gray-500">You're joining as a guest</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Enter your display name so others in the room can identify you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Alice Johnson"
            maxLength={40}
            autoFocus
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/30 transition-colors text-sm"
          />

          <button
            type="submit"
            disabled={displayName.trim().length < 1 || isLoading}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all
              bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/40
              shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Enter Studio
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
