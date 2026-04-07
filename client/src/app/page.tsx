// client/src/app/page.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackgroundShader from "@/components/BackgroundShader";
import Image from "next/image";
import MathematicalAnimationsPreview from "@/components/MathematicalAnimationsPreview";
import FeatureShowcase from "@/components/FeatureShowcase";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * Redesigned LandingPage to match the AI Animation Studio aesthetic.
 * Integrates an animated shader background and a modern, high-impact Hero section.
 */
export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <LoadingSpinner size="lg" message="Loading FlatMotion..." />
      </div>
    );
  }

  // To prevent flash of landing page while redirecting
  if (user) {
    return null; 
  }

  return (
    // <div className="relative w-full bg-black">
    <div className="relative w-full ">

      {/* Dynamic Background */}
      <BackgroundShader />

      <main className="relative z-10 w-full">
   {/* HERO SECTION */}
<section className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-24 flex flex-col items-center text-center overflow-hidden">

  {/* Animated Math Layer */}
  <svg
    className="absolute inset-0 w-full h-full opacity-20"
    viewBox="0 0 1200 400"
    preserveAspectRatio="none"
  >
    {/* wave 1 */}
    <path
      d="M0 200 Q150 100 300 200 T600 200 T900 200 T1200 200"
      stroke="url(#heroGradient)"
      strokeWidth="2"
      fill="none"
      className="animate-[waveFlow_8s_linear_infinite]"
    />

    {/* wave 2 */}
    <path
      d="M0 250 Q200 150 400 250 T800 250 T1200 250"
      stroke="url(#heroGradient)"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
      className="animate-[waveFlowReverse_10s_linear_infinite]"
    />

    {/* moving particle */}
    <circle r="5" fill="url(#heroGradient)">
      <animateMotion
        dur="8s"
        repeatCount="indefinite"
        path="M0 200 Q150 100 300 200 T600 200 T900 200 T1200 200"
      />
    </circle>

    <defs>
      <linearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>

  {/* Badge */}
  <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-md">
    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
    <span className="text-xs tracking-widest text-secondary uppercase">
      Mathematical Animations Generator
    </span>
  </div>

  {/* HEADLINE */}
  <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] text-white mb-8 leading-[1.05]">
    Animate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]">Mathematics</span><br />
    Like Never Before
  </h1>

  {/* Floating equation */}
  <div className="absolute top-[20%] text-white/10 text-xl font-mono animate-pulse">
    y = sin(x + t)
  </div>

  {/* DESCRIPTION */}
  <p className="relative z-10 text-lg md:text-xl text-gray-400 mb-12 max-w-2xl">
    Turn equations into living systems. Visualize change, motion, and structure — powered by AI.
  </p>

  {/* CTA */}
<Link
  href="/login"
  className="relative z-10 group px-12 py-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-lg overflow-hidden animate-ctaGlowSoft hover:scale-[1.02] transition-all duration-300"
>
  <span className="relative z-10">Start Creating</span>

  {/* subtle sweep */}
  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
    <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-ctaSweepSoft" />
  </div>
</Link>

  {/* subtle grid */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
      backgroundSize: "80px 80px",
    }}
  />
</section>

        {/* Mathematical Animations Preview */}
        <MathematicalAnimationsPreview />

        {/* Feature Showcase */}
        <FeatureShowcase />



{/* CTA Section */}
<section className="w-full py-32 relative overflow-hidden bg-black">

  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 blur-3xl opacity-40" />

  {/* SVG WAVE */}
  <svg
    className="absolute inset-0 w-full h-full opacity-30"
    viewBox="0 0 1200 300"
    preserveAspectRatio="none"
  >
    {/* sine wave */}
    <path
      d="M0 150 Q150 50 300 150 T600 150 T900 150 T1200 150"
      fill="none"
      stroke="url(#waveGradient)"
      strokeWidth="3"
      className="animate-[waveMove_6s_linear_infinite]"
    />

    {/* glowing dot moving */}
    <circle r="6" fill="url(#waveGradient)">
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        path="M0 150 Q150 50 300 150 T600 150 T900 150 T1200 150"
      />
    </circle>

    {/* gradient */}
    <defs>
      <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>

  {/* CONTENT */}
  <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
    <h2 className="text-5xl font-bold mb-6 text-white">
      Bring <span className="text-gradient">Mathematics</span> to Life
    </h2>

    <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
      Watch equations evolve, curves move, and ideas animate in real time.
    </p>

<Link
  href="/login"
  className="relative z-10 group px-12 py-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-lg overflow-hidden animate-ctaGlowSoft hover:scale-[1.02] transition-all duration-300"
>
  <span className="relative z-10">Start Creating</span>

  {/* subtle sweep */}
  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
    <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-ctaSweepSoft" />
  </div>
</Link>

  </div>

  {/* GRID overlay for depth */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage:
        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />
</section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 flex flex-col items-center text-center bg-black/50 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/logo.png"
            alt="FlatMotion"
            width={240}
            height={60}
            className="h-20 w-auto"
          />
        </div>
        <div className="flex gap-8 mb-8 text-gray-400 flex-wrap justify-center">
          <Link href="#" className="text-sm hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="text-sm hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="text-sm hover:text-white transition-colors">Documentation</Link>
          <Link href="#" className="text-sm hover:text-white transition-colors">Community</Link>
        </div>
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} FlatMotion. Create beautiful mathematical animations with AI.</p>
      </footer>
    </div>
  );
}
