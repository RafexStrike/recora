"use client";

import { useState, useEffect } from "react";

interface MathExample {
  title: string;
  description: string;
  id: "trig" | "diff" | "integ" | "limit";
}

const mathExamples: MathExample[] = [
  {
    title: "Trigonometric Waves",
    description: "Visualizing sin(x) periodicity and phase shifts.",
    id: "trig",
  },
  {
    title: "Differentiation",
    description: "Instantaneous rate of change via a moving tangent.",
    id: "diff",
  },
  {
    title: "Integration",
    description: "Area accumulation under a curve over time.",
    id: "integ",
  },
  {
    title: "Limit Theory",
    description: "Converging toward a value through shrinking steps.",
    id: "limit",
  },
];

export default function MathematicalAnimationsPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const delay = 2000; // 🔥 change speed here

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mathExamples.length);
    }, delay);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const active = mathExamples[activeIndex];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 bg-background">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
        Visualize <span className="text-gradient">Core</span> Mathematics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* VISUAL AREA */}
        <div className="relative aspect-video bg-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

          {/* Grid */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">

            {/* AXES */}
            <line x1="20" y1="100" x2="380" y2="100" stroke="var(--muted)" opacity="0.4" />
            <line x1="200" y1="20" x2="200" y2="180" stroke="var(--muted)" opacity="0.4" />

            {/* ================= TRIG ================= */}
            {active.id === "trig" && (
              <g>
                <path
                  d="M 20 100 Q 65 20 110 100 T 200 100 T 290 100 T 380 100"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  className="animate-[wave_2s_linear_infinite]"
                />

                <circle r="5" fill="var(--secondary)">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 20 100 Q 65 20 110 100 T 200 100 T 290 100 T 380 100"
                  />
                </circle>
              </g>
            )}

            {/* ================= DIFF ================= */}
            {active.id === "diff" && (
              <g>
                <path
                  d="M 50 150 C 150 150 250 50 350 50"
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="2"
                />

                <g className="animate-[move_2s_linear_infinite]">
                  <line
                    x1="150"
                    y1="150"
                    x2="250"
                    y2="50"
                    stroke="var(--secondary)"
                    strokeWidth="3"
                  />
                  <circle cx="200" cy="100" r="5" fill="var(--primary)" />
                </g>
              </g>
            )}

            {/* ================= INTEGRATION ================= */}
            {active.id === "integ" && (
              <g>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* curve */}
                <path
                  d="M 50 150 Q 200 20 350 150"
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth="2"
                />

                {/* animated area */}
                <path
                  d="M 50 150 Q 200 20 350 150 L 350 150 L 50 150 Z"
                  fill="url(#areaGradient)"
                  className="animate-[reveal_2s_ease-out_forwards]"
                />

                {/* moving tracer */}
                <circle r="5" fill="var(--primary)">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path="M 50 150 Q 200 20 350 150"
                  />
                </circle>
              </g>
            )}

            {/* ================= LIMIT ================= */}
            {active.id === "limit" && (
              <g transform="translate(200,100)">
                {[60, 40, 25, 12, 5].map((r, i) => (
                  <circle
                    key={i}
                    r={r}
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="1.5"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
                <circle r="3" fill="var(--primary)" />
              </g>
            )}

          </svg>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-3">
          {mathExamples.map((example, index) => {
            const isSelected = index === activeIndex;

            return (
              <button
                key={example.id}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlay(false);
                }}
                className={`w-full p-5 rounded-xl border transition ${
                  isSelected
                    ? "bg-primary/10 border-primary"
                    : "bg-surface border-white/5"
                }`}
              >
                <h3 className="font-bold text-white">{example.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {example.description}
                </p>
              </button>
            );
          })}

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="w-full py-2 text-xs text-muted-foreground border-t pt-4"
          >
            {isAutoPlay
              ? `● Auto (${delay / 1000}s)`
              : "○ Static Mode"}
          </button>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes wave {
          0% { stroke-dashoffset: 500; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes reveal {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0% 0 0); }
        }

        @keyframes move {
          0% { transform: translateX(-40px); }
          50% { transform: translateX(40px); }
          100% { transform: translateX(-40px); }
        }
      `}</style>
    </section>
  );
}