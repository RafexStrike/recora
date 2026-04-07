"use client";

export default function BackgroundShader() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

      {/* MAIN PURPLE GLOW (breathing) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1200px] h-[1200px] bg-purple-600/30 rounded-full blur-[160px] animate-glowPulse" />
      </div>

      {/* SECONDARY CYAN GLOW (slight offset) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1000px] h-[1000px] bg-cyan-400/20 rounded-full blur-[140px] animate-glowPulseDelay" />
      </div>

    </div>
  );
}