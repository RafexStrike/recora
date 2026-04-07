// File: client/src/components/ai/ChatCanvas.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChatMessage } from '@/hooks/useAIChat';

interface Props {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  userName: string;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function UserAvatar({ name }: { name: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-lg">
      {(name?.[0] ?? 'U').toUpperCase()}
    </div>
  );
}

function AIAvatar() {
  return (
    <Image
      src="/logo.png"
      alt="FlatMotion"
      width={220}
      height={55}
      className="h-8 w-auto flex-shrink-0"
    />
  );
}

export default function ChatCanvas({ messages, loading, error, userName }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center h-full text-center select-none">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 border border-white/[0.07] flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium text-sm">Start your animation</p>
          <p className="text-gray-600 text-xs mt-1">Select a provider and model below, then describe your animation.</p>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg) =>
        msg.role === 'user' ? (
          // User bubble
          <div key={msg.id} className="flex items-start gap-3">
            <UserAvatar name={userName} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-semibold text-white">{userName}</span>
                <span className="text-[11px] text-gray-500">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="bg-[#1a1a1f] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-200 leading-relaxed max-w-2xl">
                {msg.content}
              </div>
              <p className="text-[10px] text-gray-600 mt-1 ml-1">Today</p>
            </div>
          </div>
        ) : (
          // AI response card
          <div key={msg.id} className="flex items-start gap-3">
            <AIAvatar />
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">FlatMotion</span>
                  <span className="text-[11px] text-gray-500">{formatTime(msg.timestamp)}</span>
                </div>
                {msg.isSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Generated
                  </span>
                )}
              </div>
              <div
                className={`rounded-2xl rounded-tl-sm p-5 border ${
                  msg.isSuccess
                    ? 'bg-gradient-to-br from-[#1a1320] to-[#0f1a20] border-[#7C3AED]/20 shadow-[0_0_30px_rgba(124,58,237,0.08)]'
                    : 'bg-[#1a1a1f] border-white/[0.07]'
                }`}
              >
                {msg.isSuccess ? (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      Animation generation complete!
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {msg.content}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-px flex-1 bg-white/[0.05]" />
                      <span className="text-[11px] text-gray-600">Open DevTools → Console to inspect the payload</span>
                      <div className="h-px flex-1 bg-white/[0.05]" />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white hover:opacity-90 transition-opacity">
                        Regenerate
                      </button>
                      <button className="px-4 py-1.5 text-xs font-medium rounded-lg bg-white/[0.06] border border-white/[0.08] text-gray-300 hover:bg-white/[0.1] transition-all">
                        Edit Prompt
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">{msg.content}</p>
                )}
              </div>
            </div>
          </div>
        ),
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-start gap-3">
          <AIAvatar />
          <div className="flex-1 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-white">FlatMotion</span>
            </div>
            <div className="bg-gradient-to-br from-[#1a1320] to-[#0f1a20] border border-[#7C3AED]/20 rounded-2xl rounded-tl-sm p-5 shadow-[0_0_30px_rgba(124,58,237,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">Generating your animation…</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-3 px-1">
          <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
