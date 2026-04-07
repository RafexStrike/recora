"use client";

interface Feature {
  title: string;
  description: string;
  id: string;
}

const features: Feature[] = [
  {
    title: "Manim Engine Integration",
    description: "Leverage the industry-standard framework for mathematical storytelling. Every animation adheres to the precise visual language established by 3Blue1Brown.",
    id: "engine",
  },
  {
    title: "LLM-to-Manim Pipeline",
    description: "Convert natural language descriptions into complex Python scripts. Our specialized AI understands LaTeX, linear algebra, and calculus concepts natively.",
    id: "pipeline",
  },
  {
    title: "Vector-Based Precision",
    description: "Resolution-independent rendering ensures that every curve, axis, and coordinate transformation remains perfectly sharp at any scale.",
    id: "precision",
  },
  {
    title: "Automated LaTeX Typesetting",
    description: "Complex equations are automatically formatted and animated using professional-grade TeX, allowing for seamless integration of theory and visual.",
    id: "typeset",
  },
  {
    title: "Zero-Code Visualization",
    description: "Bypass the steep learning curve of mathematical programming. Generate sophisticated 2D and 3D scenes through intuitive iterative prompting.",
    id: "nocode",
  },
  {
    title: "Educational Scaffolding",
    description: "Optimized for creators and researchers. Build comprehensive visual proofs and lectures that bridge the gap between abstract notation and intuition.",
    id: "edu",
  },
];

export default function FeatureShowcase() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-32 bg-background">
      {/* Centered Header Section */}
      <div className="text-center mb-24">
        <div className="inline-block px-4 py-1 mb-6 border border-primary/30 rounded-full">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono">
            Core Architecture
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight max-w-4xl mx-auto leading-tight">
          Visualizing <span className="text-gradient">Abstractions</span> Through Algorithmic Animation
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          FlatMotion translates rigorous mathematical prompts into fluid, Manim-based animations. 
          Bridge the gap between symbolic logic and visual intuition instantly.
        </p>
      </div>

      {/* Centered Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group relative p-10 bg-surface/50 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 text-center flex flex-col items-center"
          >
            {/* Top Index Label */}
            <div className="text-[10px] font-mono text-primary/60 mb-6 tracking-widest">
              SEC_{feature.id.toUpperCase()}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
              {feature.description}
            </p>

            {/* Subtle bottom indicator */}
            <div className="mt-8 h-[2px] w-8 bg-border group-hover:w-16 group-hover:bg-secondary transition-all duration-500" />
          </div>
        ))}
      </div>

    </section>
  );
}