"use client";

import { useEffect, useRef } from "react";

interface ShaderExample {
  title: string;
  description: string;
  glslFragment: string;
}

const shaderExamples: ShaderExample[] = [
  {
    title: "Mandelbrot Fractal",
    description: "Explore the infinite beauty of the Mandelbrot set in real-time.",
    glslFragment: `
      precision highp float;
      uniform float time;
      varying vec2 vUv;

      void main() {
        vec2 z = vUv * 2.0 - 1.0;
        z.x *= 1.333;
        z -= vec2(0.5, 0.0);
        z *= exp(-0.1 * time) + 0.5;

        vec3 color = vec3(0.0);
        for(int i = 0; i < 100; i++) {
          float r = dot(z, z);
          if(r > 4.0) break;
          z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + vec2(-0.7, 0.27015);
          color += 0.01 * vec3(sin(float(i)*0.1), cos(float(i)*0.1), sin(float(i)*0.2));
        }
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },
  {
    title: "Wave Interference",
    description: "Visualize interference patterns of oscillating waves.",
    glslFragment: `
      precision highp float;
      uniform float time;
      varying vec2 vUv;

      void main() {
        vec2 p = vUv * 6.0;
        float wave1 = sin(p.x - time) + sin(p.y - time);
        float wave2 = cos(p.x + time) * cos(p.y + time);
        float interference = sin(wave1 * 3.0) * cos(wave2 * 3.0);

        vec3 color = vec3(
          0.5 + 0.5 * sin(interference),
          0.5 + 0.5 * cos(interference),
          0.5 + 0.5 * sin(interference + 1.0)
        );

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },
  {
    title: "Lissajous Curves",
    description: "Parametric curves creating beautiful harmonic patterns.",
    glslFragment: `
      precision highp float;
      uniform float time;
      varying vec2 vUv;

      void main() {
        vec2 p = vUv * 2.0 - 1.0;

        float a = sin(p.x * 3.0 + time);
        float b = cos(p.y * 4.0 + time);
        float c = sin(p.x * 2.0 + time * 0.5);

        float dist = length(vec2(a, b) - p);

        vec3 color = vec3(
          0.5 + 0.5 * sin(dist + time),
          0.5 + 0.5 * cos(dist - time),
          0.5 + 0.5 * sin(dist * 2.0)
        );

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },
  {
    title: "Stochastic Field",
    description: "Perlin-inspired noise creating organic mathematical beauty.",
    glslFragment: `
      precision highp float;
      uniform float time;
      varying vec2 vUv;

      float hash(float n) {
        return fract(sin(n) * 43758.5453);
      }

      void main() {
        vec2 p = vUv * 4.0 + time * 0.5;
        float noise = hash(floor(p.x) * 73.0 + floor(p.y) * 113.0);

        vec3 color = vec3(
          0.5 + 0.5 * sin(noise * 6.28 + time),
          0.5 + 0.5 * cos(noise * 6.28 - time),
          0.5 + 0.5 * sin(noise * 6.28 + time * 0.7)
        );

        gl_FragColor = vec4(color * (0.5 + 0.5 * sin(time)), 1.0);
      }
    `,
  },
];

export default function MathematicalShaderShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentShaderIndex = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;

      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Create shader program
    const createShaderProgram = (fragmentSource: string) => {
      const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.compileShader(vertexShader);

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fragmentShader, fragmentSource);
      gl.compileShader(fragmentShader);

      const program = gl.createProgram()!;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      return program;
    };

    const program = createShaderProgram(
      shaderExamples[currentShaderIndex.current].glslFragment
    );
    gl.useProgram(program);

    // Create buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "time");

    // Animation loop
    let startTime = Date.now();
    let animationId: number;

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      gl.uniform1f(timeLocation, elapsed);

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    render();

    // Change shader every 6 seconds
    const shaderInterval = setInterval(() => {
      currentShaderIndex.current =
        (currentShaderIndex.current + 1) % shaderExamples.length;
      const newProgram = createShaderProgram(
        shaderExamples[currentShaderIndex.current].glslFragment
      );
      gl.useProgram(newProgram);
      gl.uniform1f(
        gl.getUniformLocation(newProgram, "time"),
        (Date.now() - startTime) / 1000
      );
      startTime = Date.now();
    }, 6000);

    return () => {
      clearInterval(shaderInterval);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
        Mathematical Visualizations with Shaders
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Real-time GLSL shader visualizations of fractals, waves, and parametric curves, all generated dynamically.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main shader canvas */}
        <div className="lg:col-span-3">
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl h-96">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Shaders update automatically every 6 seconds
          </p>
        </div>

        {/* Shader info cards */}
        <div className="lg:col-span-2 space-y-4">
          {shaderExamples.map((shader, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                index === currentShaderIndex.current
                  ? "border-primary bg-primary/10 backdrop-blur-sm text-white"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-1">📐</div>
                <div>
                  <h3 className="font-semibold text-white">{shader.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {shader.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/5 border border-white/10 text-sm text-gray-300">
            <p className="font-semibold text-white mb-2">💡 Pro Tip</p>
            <p>
              All these visualizations can be created with FlatMotion using mathematical descriptions. No WebGL code needed!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
