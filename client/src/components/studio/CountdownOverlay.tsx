// File: client/src/components/studio/CountdownOverlay.tsx
'use client';

import { useEffect, useState } from 'react';

interface CountdownOverlayProps {
  count: number | null; // null = hidden
}

export function CountdownOverlay({ count }: CountdownOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(count !== null);
  }, [count]);

  if (!visible || count === null) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        key={count}
        className="flex flex-col items-center gap-2 animate-in zoom-in-50 duration-300"
      >
        <div className="text-[120px] font-black text-white leading-none drop-shadow-[0_0_40px_rgba(0,240,255,0.6)] tabular-nums select-none"
          style={{ textShadow: '0 0 60px rgba(0,240,255,0.8), 0 0 120px rgba(0,240,255,0.4)' }}
        >
          {count}
        </div>
        <p className="text-[#00f0ff] text-sm font-semibold tracking-[0.3em] uppercase animate-pulse">
          Starting Recording
        </p>
      </div>
    </div>
  );
}
