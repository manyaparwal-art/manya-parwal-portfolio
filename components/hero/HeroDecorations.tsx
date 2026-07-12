"use client";

import { useEffect, useRef, useState } from "react";

type HeroDecorationsProps = {
  isActive?: boolean;
};

export default function HeroDecorations({
  isActive = true,
}: HeroDecorationsProps) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [hasMoved, setHasMoved] = useState(false);

  const autoLayoutRef = useRef<HTMLDivElement | null>(null);
  const gridBadgeRef = useRef<HTMLDivElement | null>(null);
  const tokenRef = useRef<HTMLDivElement | null>(null);
  const cursorTooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrame: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const normalizedX = event.clientX / viewportWidth - 0.5;
        const normalizedY = event.clientY / viewportHeight - 0.5;

        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });

        setHasMoved(true);

        if (autoLayoutRef.current) {
          autoLayoutRef.current.style.transform = `translate3d(${
            normalizedX * 12
          }px, ${normalizedY * 9}px, 0)`;
        }

        if (gridBadgeRef.current) {
          gridBadgeRef.current.style.transform = `translate3d(${
            normalizedX * -10
          }px, ${normalizedY * -7}px, 0)`;
        }

        if (tokenRef.current) {
          tokenRef.current.style.transform = `translate3d(${
            normalizedX * 14
          }px, ${normalizedY * 10}px, 0)`;
        }

        animationFrame = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      {/* ==========================================
          SUBTLE FIGMA GRID
      ========================================== */}

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 48%, black 0%, rgba(0,0,0,0.72) 52%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 48%, black 0%, rgba(0,0,0,0.72) 52%, transparent 92%)",
        }}
      />

      {/* ==========================================
          AMBIENT PURPLE GLOW
      ========================================== */}

      <div
        className={`absolute left-1/2 top-[48%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/[0.045] blur-[120px] transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] ${
          isActive
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0"
        }`}
      />

      {/* ==========================================
          ORBITAL SYSTEM
      ========================================== */}

      <div
        className={`absolute left-1/2 top-[50%] hidden h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] lg:block ${
          isActive
            ? "scale-100 opacity-100"
            : "scale-[0.92] opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-full border border-white/[0.025]" />

        <div className="absolute inset-[11%] rounded-full border border-[#8B5CF6]/[0.055]" />

        <div className="absolute inset-[23%] rounded-full border border-dashed border-white/[0.035]" />

        <div className="hero-orbit-purple absolute right-[14%] top-[14%] h-3 w-3 rounded-full bg-[#8B5CF6] shadow-[0_0_22px_rgba(139,92,246,0.85)]" />

        <div className="hero-orbit-cyan absolute bottom-[14%] left-[12%] h-2 w-2 rounded-full bg-[#52C7EA] shadow-[0_0_18px_rgba(82,199,234,0.75)]" />

        <div className="hero-orbit-small absolute bottom-[5%] right-[25%] h-1.5 w-1.5 rounded-full bg-[#8B5CF6]/80 shadow-[0_0_12px_rgba(139,92,246,0.65)]" />
      </div>

      {/* ==========================================
          AUTO LAYOUT BADGE

          Desktop: positioned between hero text
          and centre image.
      ========================================== */}

      <div
        className={`absolute left-[24%] top-[20%] z-20 hidden transition-[opacity,transform,filter] delay-[300ms] duration-[1000ms] ease-[cubic-bezier(.16,1,.3,1)] lg:block ${
          isActive
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-5 opacity-0 blur-[3px]"
        }`}
      >
        <div
          ref={autoLayoutRef}
          className="flex items-center gap-2 rounded-lg border border-[#8B5CF6]/20 bg-[#15151D]/90 px-3 py-2 text-[9px] font-medium tracking-wide text-white/45 shadow-[0_10px_35px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-transform duration-150 ease-out"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
          >
            <rect
              x="1.5"
              y="1.5"
              width="10"
              height="10"
              rx="2"
              stroke="#8B5CF6"
              strokeOpacity="0.9"
            />

            <path
              d="M4 4.5H9M4 6.5H9M4 8.5H9"
              stroke="#8B5CF6"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>

          <span>Auto Layout</span>
        </div>
      </div>

      {/* ==========================================
          8PX GRID BADGE
      ========================================== */}

      <div
        className={`absolute bottom-[18%] left-[27%] z-20 hidden transition-[opacity,transform,filter] delay-[420ms] duration-[1000ms] ease-[cubic-bezier(.16,1,.3,1)] lg:block ${
          isActive
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-5 opacity-0 blur-[3px]"
        }`}
      >
        <div
          ref={gridBadgeRef}
          className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#15151D]/90 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-transform duration-150 ease-out"
        >
          <span className="grid h-3.5 w-3.5 grid-cols-2 gap-[2px]">
            <span className="rounded-[1px] bg-[#8B5CF6]/70" />
            <span className="rounded-[1px] bg-white/20" />
            <span className="rounded-[1px] bg-white/20" />
            <span className="rounded-[1px] bg-[#52C7EA]/60" />
          </span>

          <span>8px Grid</span>
        </div>
      </div>

      {/* ==========================================
          MOVE YOUR CURSOR HINT
      ========================================== */}

      <div
        className={`absolute bottom-[19%] left-[7%] z-20 hidden transition-[opacity,transform,filter] delay-[600ms] duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] xl:block ${
          isActive && !hasMoved
            ? "translate-y-0 opacity-100 blur-0"
            : isActive
            ? "translate-y-0 opacity-35 blur-0"
            : "translate-y-5 opacity-0 blur-[3px]"
        }`}
      >
        <div className="-rotate-3">
          <svg
            width="100"
            height="65"
            viewBox="0 0 100 65"
            fill="none"
            className="mb-1 ml-[70px] opacity-50"
          >
            <path
              d="M5 57 C23 27, 49 15, 84 19"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            <path
              d="M75 11 L85 19 L76 28"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p
            className="w-[190px] text-center text-[15px] italic leading-[1.4] text-white/40"
            style={{
              fontFamily:
                "var(--font-instrument-serif), Georgia, serif",
            }}
          >
            move your cursor
            <br />
            to reveal the sketch
          </p>
        </div>
      </div>

      {/* ==========================================
          CONNECTOR LINE
      ========================================== */}

      <svg
        className={`absolute left-[55%] top-[18%] z-10 hidden h-[180px] w-[300px] transition-opacity delay-[500ms] duration-[1200ms] xl:block ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        viewBox="0 0 300 180"
        fill="none"
      >
        <path
          d="M15 30 C95 8, 185 45, 278 150"
          stroke="rgba(139,92,246,0.16)"
          strokeWidth="1"
          strokeDasharray="3 7"
        />

        <circle
          cx="15"
          cy="30"
          r="4.5"
          fill="#8B5CF6"
          fillOpacity="0.9"
        />

        <circle
          cx="278"
          cy="150"
          r="3.5"
          fill="#52C7EA"
          fillOpacity="0.8"
        />
      </svg>

      {/* ==========================================
          FRAME LABEL
      ========================================== */}

      <div
        className={`absolute right-[5%] top-[27%] z-20 hidden items-center gap-3 transition-[opacity,transform] delay-[520ms] duration-[900ms] xl:flex ${
          isActive
            ? "translate-x-0 opacity-100"
            : "translate-x-5 opacity-0"
        }`}
      >
        <span className="text-[7px] uppercase tracking-[0.32em] text-white/25">
          Frame 01
        </span>

        <span className="h-px w-10 bg-white/15" />
      </div>

      {/* ==========================================
          DESIGN TOKEN
      ========================================== */}

      <div
        className={`absolute bottom-[13%] right-[26%] z-20 hidden transition-[opacity,transform] delay-[600ms] duration-[1000ms] xl:block ${
          isActive
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        <div
          ref={tokenRef}
          className="flex items-center gap-2 rounded-full border border-white/[0.05] bg-[#111118]/60 px-3 py-1.5 text-[7px] uppercase tracking-[0.22em] text-white/25 backdrop-blur-md transition-transform duration-150 ease-out"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.8)]" />

          <span>#8B5CF6</span>
        </div>
      </div>

      {/* ==========================================
          LIVE CURSOR COORDINATES

          Follows the actual cursor.
      ========================================== */}

      <div
        ref={cursorTooltipRef}
        className={`fixed z-[100] hidden rounded-md border border-white/[0.08] bg-[#111118]/90 px-2.5 py-1.5 font-mono text-[8px] tracking-wide text-white/35 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-opacity duration-300 xl:block ${
          hasMoved && isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: mousePosition.x + 18,
          top: mousePosition.y + 18,
        }}
      >
        X {Math.round(mousePosition.x)} · Y {Math.round(mousePosition.y)}
      </div>

      {/* ==========================================
          MOBILE / TABLET SMALL DECORATIONS
      ========================================== */}

      <div
        className={`absolute left-[8%] top-[35%] h-1.5 w-1.5 rounded-full bg-[#8B5CF6]/70 shadow-[0_0_12px_rgba(139,92,246,0.65)] transition-opacity duration-700 lg:hidden ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute bottom-[28%] right-[9%] h-1.5 w-1.5 rounded-full bg-[#52C7EA]/60 shadow-[0_0_10px_rgba(82,199,234,0.55)] transition-opacity duration-700 lg:hidden ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ==========================================
          ANIMATION STYLES
      ========================================== */}

      <style jsx>{`
        @keyframes orbitPurple {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(8px, -10px, 0);
          }
        }

        @keyframes orbitCyan {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-7px, 9px, 0);
          }
        }

        @keyframes orbitSmall {
          0%,
          100% {
            opacity: 0.45;
            transform: translate3d(0, 0, 0);
          }

          50% {
            opacity: 1;
            transform: translate3d(4px, -5px, 0);
          }
        }

        .hero-orbit-purple {
          animation: orbitPurple 5s ease-in-out infinite;
        }

        .hero-orbit-cyan {
          animation: orbitCyan 6s ease-in-out infinite;
        }

        .hero-orbit-small {
          animation: orbitSmall 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orbit-purple,
          .hero-orbit-cyan,
          .hero-orbit-small {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}