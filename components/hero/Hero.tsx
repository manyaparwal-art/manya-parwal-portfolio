"use client";

import { useEffect, useRef, useState } from "react";

import HeroCards from "./HeroCards";
import HeroImage from "./HeroImage";
import HeroText from "./HeroText";
import DesignCanvas from "./DesignCanvas";
import HeroDecorations from "./HeroDecorations";

import type { Tool } from "./DesignToolbar";

export default function Hero() {
  const [activeTool, setActiveTool] = useState<Tool>("pointer");
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "6% 0px 6% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-[100svh] overflow-hidden bg-[#0f1115]"
    >
      {/* ==========================================
          LAYER 1 — DECORATIVE ELEMENTS
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <HeroDecorations isActive={isVisible} />
      </div>

      {/* ==========================================
          LAYER 2 — INTERACTIVE DESIGN CANVAS
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 z-[15]">
        <DesignCanvas
          activeTool={activeTool}
          onToolChange={setActiveTool}
        />
      </div>

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1720px] flex-col px-4 pb-14 pt-5 sm:px-6 sm:pb-16 sm:pt-6 md:px-8 md:pb-16 lg:px-10 lg:pb-10 lg:pt-6 xl:px-14 2xl:px-20">

        {/* ==========================================
            NAVBAR
        ========================================== */}

        <header className="relative z-30 flex items-center justify-between">

          {/* LOGO */}

          <h1
            className={`font-[family-name:var(--font-instrument-serif)] text-[38px] leading-none text-white transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:text-5xl xl:text-[54px] ${
              isVisible
                ? "translate-y-0 opacity-100 blur-0"
                : "-translate-y-4 opacity-0 blur-[3px]"
            }`}
          >
            M.
          </h1>

          {/* AVAILABILITY */}

          <div
            className={`flex items-center gap-2 text-[7px] uppercase tracking-[0.16em] text-white/65 transition-[opacity,transform,filter] delay-75 duration-700 ease-[cubic-bezier(.16,1,.3,1)] min-[380px]:text-[8px] min-[380px]:tracking-[0.22em] sm:gap-2.5 sm:text-[10px] sm:tracking-[0.3em] xl:text-[11px] ${
              isVisible
                ? "translate-y-0 opacity-100 blur-0"
                : "-translate-y-4 opacity-0 blur-[3px]"
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B5CF6] opacity-30" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_14px_rgba(139,92,246,0.65)]" />
            </span>

            <span>Available for work</span>
          </div>
        </header>

        {/* ==========================================
            HERO CONTENT
        ========================================== */}

        <div className="flex flex-1 items-center py-14 sm:py-16 md:py-20 lg:py-8">

          <div className="grid w-full items-center gap-14 sm:gap-16 md:gap-20 lg:grid-cols-[minmax(270px,0.92fr)_minmax(290px,0.86fr)_minmax(250px,0.82fr)] lg:gap-8 xl:grid-cols-[minmax(320px,1fr)_minmax(340px,0.88fr)_minmax(280px,0.8fr)] xl:gap-14 2xl:grid-cols-[minmax(350px,1.05fr)_minmax(380px,0.88fr)_minmax(300px,0.78fr)] 2xl:gap-20">

            {/* ======================================
                LEFT — HERO TEXT
            ====================================== */}

            <div className="relative z-20 order-1 mx-auto w-full max-w-[620px] text-center lg:mx-0 lg:max-w-none lg:text-left">
              <HeroText isVisible={isVisible} />
            </div>

            {/* ======================================
                CENTER — HERO IMAGE
            ====================================== */}

            <div
              className={`relative z-20 order-2 mx-auto flex w-full flex-col items-center justify-center transition-[opacity,transform,filter] delay-[420ms] duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100 blur-0"
                  : "translate-y-12 scale-[0.955] opacity-0 blur-[7px]"
              }`}
            >
              <HeroImage
                activeTool={activeTool}
                onToolChange={setActiveTool}
                isActive={isVisible}
              />

              <div className="mt-3 flex items-center justify-center text-[11px] uppercase tracking-[0.18em] text-white/35 sm:text-[10px] lg:mt-2">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                <span className="italic text-white/50">Yep, these actually work. Try them.</span>
              </div>

              {/* TAGLINE */}

              <div
                className={`mt-7 flex max-w-[360px] items-center justify-center gap-3 px-4 text-center text-[12px] leading-5 text-white/35 transition-[opacity,transform] delay-[720ms] duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:text-[13px] lg:mt-6 lg:px-0 xl:text-sm ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <span className="shrink-0 text-base text-[#8B5CF6] drop-shadow-[0_0_8px_rgba(139,92,246,0.65)]">
                  ✦
                </span>

                <p>
                  Designing with purpose. Defining with details.
                </p>
              </div>
            </div>

            {/* ======================================
                RIGHT — HERO CARDS
            ====================================== */}

            <div className="relative z-20 order-3 mx-auto flex w-full max-w-[520px] justify-center lg:mx-0 lg:max-w-none lg:justify-end">
              <HeroCards isVisible={isVisible} />
            </div>

          </div>
        </div>
      </div>

      {/* ==========================================
          GLOBAL HERO STYLES
      ========================================== */}

      <style jsx global>{`
        .hero-section {
          isolation: isolate;
        }

        /*
          Mobile + tablet:
          Main hero content remains centered.
        */

        @media (max-width: 1023px) {
          .hero-section .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
            text-align: center;
          }

          .hero-section .hero-copy {
            margin-left: auto;
            margin-right: auto;
            text-align: center;
          }
        }

        /*
          Reduced motion accessibility
        */

        @media (prefers-reduced-motion: reduce) {
          .hero-section *,
          .hero-section *::before,
          .hero-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}