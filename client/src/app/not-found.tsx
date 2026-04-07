"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated background grid */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated gradient blobs */}
      <div className="absolute top-[-40%] right-[-20%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-slow-drift" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] animate-slow-drift-reverse" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/logo.png"
            alt="FlatMotion"
            width={180}
            height={45}
            className="h-16 w-auto opacity-80 mb-8"
          />
        </div>

        {/* Large 404 with animation */}
        <div className="mb-8">
          <h1 className="text-9xl sm:text-[150px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-pulse mb-4">
            404
          </h1>
          <div className="flex items-center justify-center gap-4 text-4xl sm:text-5xl mb-6">
            <span className="text-white/80">The equation</span>
            <svg
              className="w-12 h-12 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            <span className="text-white/80">=</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              ?
            </span>
          </div>
        </div>

        {/* Descriptive text */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-400 max-w-md mb-12 leading-relaxed">
          This page doesn't exist in our mathematical universe. Like an unsolved equation, we can't render this route. Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105"
          >
            ← Go Back
          </button>
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all hover:scale-105"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Mathematical ASCII art */}
        <div className="mt-16 text-center text-gray-600 font-mono text-xs sm:text-sm leading-relaxed">
          <p className="mb-4">Error Code Analysis:</p>
          <div className="inline-block rounded-lg bg-black/50 border border-white/5 p-6">
            <p>∫ f(x) dx = ∞ (infinite redirects)</p>
            <p>∂/∂t (page) = undefined</p>
            <p>f⁻¹(404) ≠ valid_route</p>
          </div>
        </div>
      </div>

      {/* Floating mathematical symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { text: "∑", top: "10%", left: "5%", delay: 0 },
          { text: "∞", top: "20%", right: "8%", delay: 1 },
          { text: "π", bottom: "15%", left: "10%", delay: 2 },
          { text: "∂", top: "40%", right: "5%", delay: 3 },
          { text: "∫", bottom: "30%", right: "15%", delay: 4 },
          { text: "√", top: "60%", left: "8%", delay: 5 },
        ].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-3xl sm:text-5xl opacity-10 animate-float"
            style={{
              top: symbol.top,
              bottom: symbol.bottom,
              left: symbol.left,
              right: symbol.right,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${symbol.delay * 0.5}s`,
            }}
          >
            {symbol.text}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
