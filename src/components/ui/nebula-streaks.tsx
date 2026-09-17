import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Renders a single still frame of drifting smoke. Motion comes from CSS on the layers,
// so this shader runs once per layer instead of every frame.
const fragmentShader = `
precision highp float;

uniform vec2  u_res;
uniform float u_seed;
uniform vec3  u_bg;
uniform vec3  u_deep;
uniform vec3  u_mid;
uniform vec3  u_glow;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) + u_seed;

  vec2 q = vec2(fbm(p * 1.6), fbm(p * 1.6 + vec2(5.2, 1.3)));
  vec2 r = vec2(fbm(p * 1.4 + 3.0 * q + vec2(1.7, 9.2)), fbm(p * 1.4 + 3.0 * q + vec2(8.3, 2.8)));
  float f = fbm(p * 1.3 + 2.5 * r);

  vec3 col = u_bg;
  col = mix(col, u_deep, smoothstep(0.15, 0.55, f));
  col = mix(col, u_mid, smoothstep(0.4, 0.8, f) * 0.85);
  col += u_glow * pow(smoothstep(0.5, 0.95, f), 2.0) * 0.4 * length(q);

  float focus = exp(-pow((uv.y - 0.35) / 0.55, 2.0));
  col *= 0.85 + 0.45 * focus;

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface NebulaPalette {
  bg: string;
  deep: string;
  mid: string;
  glow: string;
  streak: string;
}

export const NEBULA_BRAND_PALETTE: NebulaPalette = {
  bg: "#07080c",
  deep: "#0c1446",
  mid: "#2541d8",
  glow: "#22d3ee",
  streak: "#cfdcff",
};

// top: % from the top of the hero. duration/delay in seconds (negative delay = already mid-flight on load).
const STREAKS = [
  { top: 64, width: 22, duration: 7.5, delay: -1.2, opacity: 0.7 },
  { top: 68, width: 34, duration: 10, delay: -6.4, opacity: 0.45 },
  { top: 71, width: 16, duration: 6.2, delay: -3.1, opacity: 0.85 },
  { top: 74, width: 28, duration: 8.8, delay: -7.9, opacity: 0.55 },
  { top: 78, width: 20, duration: 5.6, delay: -0.4, opacity: 0.9 },
  { top: 81, width: 38, duration: 11.5, delay: -9.2, opacity: 0.4 },
  { top: 84, width: 18, duration: 6.8, delay: -4.6, opacity: 0.75 },
  { top: 87, width: 26, duration: 9.4, delay: -2.3, opacity: 0.5 },
  { top: 90, width: 14, duration: 5.9, delay: -5.1, opacity: 0.8 },
  { top: 93, width: 30, duration: 10.6, delay: -8.1, opacity: 0.35 },
];

// The CSS layers are 120% of the hero and drift inside it; this is how much of that we render.
const RENDER_SCALE = 0.5;
const SEEDS = [0, 37.4];

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];
};

function paintSmoke(targets: HTMLCanvasElement[], palette: NebulaPalette) {
  const first = targets[0];
  const width = Math.max(1, Math.round(first.clientWidth * RENDER_SCALE));
  const height = Math.max(1, Math.round(first.clientHeight * RENDER_SCALE));

  const glCanvas = document.createElement("canvas");
  glCanvas.width = width;
  glCanvas.height = height;
  const gl = glCanvas.getContext("webgl", { preserveDrawingBuffer: true, antialias: false });
  if (!gl) return false;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShader));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  gl.viewport(0, 0, width, height);
  gl.uniform2f(gl.getUniformLocation(program, "u_res"), width, height);
  (["bg", "deep", "mid", "glow"] as const).forEach((key) => {
    gl.uniform3f(gl.getUniformLocation(program, `u_${key}`), ...hexToRgb(palette[key]));
  });
  const uSeed = gl.getUniformLocation(program, "u_seed");

  targets.forEach((target, index) => {
    gl.uniform1f(uSeed, SEEDS[index % SEEDS.length]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    target.width = width;
    target.height = height;
    target.getContext("2d")?.drawImage(glCanvas, 0, 0);
  });

  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return true;
}

export interface NebulaStreaksProps {
  palette?: NebulaPalette;
  /** Freezes the drifting smoke and the light streaks. */
  paused?: boolean;
  className?: string;
}

export default function NebulaStreaks({
  palette = NEBULA_BRAND_PALETTE,
  paused = false,
  className,
}: NebulaStreaksProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<HTMLCanvasElement[]>([]);
  const [ready, setReady] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let lastWidth = 0;
    let timer = 0;
    const paint = () => {
      // Height changes (mobile URL bar) don't need a repaint; the layers are oversized.
      if (Math.abs(root.clientWidth - lastWidth) < 40) return;
      lastWidth = root.clientWidth;
      setReady(paintSmoke(layerRefs.current, palette));
    };

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(paint, lastWidth ? 250 : 0);
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    intersectionObserver.observe(root);

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [palette]);

  const [sr, sg, sb] = hexToRgb(palette.streak).map((channel) => Math.round(channel * 255));
  const streakVars = {
    "--nebula-streak": palette.streak,
    "--nebula-streak-soft": `rgba(${sr}, ${sg}, ${sb}, 0.75)`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={streakVars}
      className={cn(
        "nebula pointer-events-none absolute inset-0 overflow-hidden",
        (paused || offscreen) && "nebula-paused",
        className,
      )}
    >
      {SEEDS.map((seed, index) => (
        <canvas
          key={seed}
          ref={(el) => {
            if (el) layerRefs.current[index] = el;
          }}
          className={cn(
            "nebula-layer absolute -inset-[10%] h-[120%] w-[120%] transition-opacity duration-1000",
            index === 0 ? "nebula-layer-a" : "nebula-layer-b",
            !ready && "opacity-0",
          )}
        />
      ))}

      {STREAKS.map((streak) => (
        <span
          key={streak.top}
          className="nebula-streak"
          style={
            {
              top: `${streak.top}%`,
              width: `${streak.width}vw`,
              opacity: streak.opacity,
              animationDuration: `${streak.duration}s`,
              animationDelay: `${streak.delay}s`,
            } as CSSProperties
          }
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_45%,transparent_55%,rgba(7,8,12,0.85)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
