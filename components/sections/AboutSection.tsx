"use client";

import { useEffect, useRef, useState } from "react";
import AboutDesignCanvas from "./AboutDesignCanvasComponent";
import type { Tool } from "../hero/DesignToolbar";

/* ==========================================
   CAPABILITIES
========================================== */

const capabilities = [
  {
    number: "01",
    title: "Understand",
    description:
      "Finding the real problem before jumping into pixels.",
    skills: ["UX Research", "User Flows", "Product Thinking"],
    meta: "3 layers · research",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "Turning messy thoughts into clear, usable experiences.",
    skills: [
      "Wireframing",
      "Information Architecture",
      "Prototyping",
    ],
    meta: "3 layers · structure",
  },
  {
    number: "03",
    title: "Craft",
    description:
      "Shaping interfaces that feel thoughtful, visual and intuitive.",
    skills: [
      "UI Design",
      "Visual Systems",
      "Responsive Design",
    ],
    meta: "3 layers · visual",
  },
  {
    number: "04",
    title: "Polish",
    description:
      "Adding the tiny moments that make a product feel alive.",
    skills: [
      "Micro-interactions",
      "Design Storytelling",
      "AI-assisted Visual Design",
    ],
    meta: "3 layers · refine",
  },
];

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCapability, setActiveCapability] = useState<number>(0);
  const [activeTool, setActiveTool] = useState<Tool>("pointer");

  const sectionRef = useRef<HTMLElement | null>(null);

  /* ==========================================
     BIDIRECTIONAL SCROLL REVEAL
  ========================================== */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.04,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    const section = sectionRef.current;

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }

      observer.disconnect();
    };
  }, []);

  /* ==========================================
     CAPABILITY INTERACTION
  ========================================== */

  const handleCapabilityEnter = (index: number) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      setActiveCapability(index);
    }
  };

  const handleCapabilityClick = (index: number) => {
    setActiveCapability(index);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        overflow-hidden
        border-t
        border-white/10
        px-4
        py-16
        text-white

        min-[400px]:px-5
        min-[400px]:py-20

        sm:px-8
        sm:py-24

        md:px-10
        md:py-28

        lg:px-12

        xl:px-16
        xl:py-32
      "
    >
      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute right-0 top-0 h-full w-[280px] bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.15),_transparent_52%)] opacity-70 sm:w-96 sm:opacity-80" />

      <div className="pointer-events-none absolute bottom-[10%] left-[8%] h-52 w-52 rounded-full bg-[#8B5CF6]/[0.035] blur-[80px] sm:h-72 sm:w-72 sm:blur-[100px]" />

      {/* DECORATIVE CROSS — DESKTOP ONLY */}

      <div className="pointer-events-none absolute left-[51%] top-0 hidden h-7 w-px bg-[#8B5CF6]/50 min-[1100px]:block" />

      <div className="pointer-events-none absolute left-[calc(51%-13px)] top-[13px] hidden h-px w-7 bg-[#8B5CF6]/50 min-[1100px]:block" />

      {/* ==========================================
          MAIN GRID

          Mobile + Tablet = one column
          Laptop + Desktop = two columns
      ========================================== */}

      <div
        className="
          mx-auto
          grid
          w-full
          max-w-screen-2xl
          grid-cols-1
          gap-12

          sm:gap-14

          md:gap-16

          min-[1100px]:grid-cols-[1.08fr_0.92fr]
          min-[1100px]:items-start
          min-[1100px]:gap-10

          xl:gap-14

          2xl:gap-20
        "
      >
        {/* ==========================================
            LEFT SIDE
        ========================================== */}

        <div className="relative z-10 min-w-0">
          {/* LABEL */}

          <p
            className={`
              section-label
              transition-all
              duration-700
              ease-[cubic-bezier(.16,1,.3,1)]

              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }
            `}
          >
            ABOUT ME
          </p>

          {/* ==========================================
              HEADING
          ========================================== */}

          <h2
            className="
              section-heading
              mt-4
              max-w-[12ch]
              overflow-hidden
              text-[42px]
              leading-[0.94]

              min-[400px]:text-[46px]

              sm:mt-5
              sm:max-w-[14ch]
              sm:text-[56px]
              sm:leading-[0.92]

              md:text-[64px]

              lg:max-w-2xl
              lg:text-[68px]

              xl:text-[clamp(60px,4.5vw,72px)]
            "
          >
            <span
              className={`
                block
                transition-all
                duration-700
                ease-[cubic-bezier(.16,1,.3,1)]

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
              `}
            >
              I design with
            </span>

            <span
              className={`
                block
                italic
                text-[#8B5CF6]
                transition-all
                delay-100
                duration-700
                ease-[cubic-bezier(.16,1,.3,1)]

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
              `}
            >
              feeling first.
            </span>
          </h2>

          {/* ==========================================
              INTRO TEXT
          ========================================== */}

          <div
            className="
              mt-6
              max-w-[42rem]
              space-y-3.5
              text-[14px]
              leading-[1.75]
              text-zinc-300

              min-[400px]:text-[14.5px]

              sm:mt-7
              sm:space-y-4
              sm:text-[15px]
              sm:leading-7

              md:max-w-[46rem]
              md:text-base
              md:leading-8

              xl:max-w-[42rem]
              xl:text-[16px]
            "
          >
            <p
              className={`
                transition-all
                delay-200
                duration-700
                ease-[cubic-bezier(.16,1,.3,1)]

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-7 opacity-0"
                }
              `}
            >
              I&apos;m a product designer who cares deeply about how
              digital experiences feel, not just how they look. I turn
              complex ideas into interfaces that feel clear, thoughtful
              and surprisingly easy to use.
            </p>

            <p
              className={`
                transition-all
                delay-300
                duration-700
                ease-[cubic-bezier(.16,1,.3,1)]

                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-7 opacity-0"
                }
              `}
            >
              Somewhere between research, wireframes and far too many
              open Figma tabs, I found myself drawn to digital product
              design.
            </p>
          </div>

          {/* ==========================================
              INTERACTIVE FIGMA CANVAS
          ========================================== */}

          <div
            className={`
              group/canvas
              relative
              mt-9
              h-[300px]
              w-full
              min-w-0
              overflow-hidden
              rounded-[20px]
              border
              border-white/10
              bg-[#0d0d14]/75
              shadow-[0_20px_55px_rgba(0,0,0,0.3)]
              backdrop-blur-xl

              transition-all
              delay-[400ms]
              duration-1000
              ease-[cubic-bezier(.16,1,.3,1)]

              min-[400px]:h-[320px]
              min-[400px]:rounded-[22px]

              sm:mt-11
              sm:h-[360px]
              sm:rounded-[26px]

              md:mt-12
              md:h-[380px]
              md:rounded-[28px]

              ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-12 scale-[0.98] opacity-0"
              }
            `}
          >
            {/* GRID */}

            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* CONNECTOR PATHS */}

            <svg
              className="pointer-events-none absolute inset-0 z-10 h-full w-full"
              viewBox="0 0 700 380"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M170 115 C250 115, 250 80, 350 100"
                fill="none"
                stroke="rgba(139,92,246,0.38)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                className="transition-all duration-700 group-hover/canvas:stroke-[#8B5CF6]"
              />

              <path
                d="M455 110 C510 160, 350 190, 275 260"
                fill="none"
                stroke="rgba(139,92,246,0.38)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />

              <path
                d="M310 280 C400 300, 440 280, 525 275"
                fill="none"
                stroke="rgba(139,92,246,0.38)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />
            </svg>

            {/* ANNOTATION */}

            <div
              className="
                pointer-events-none
                absolute
                left-[43%]
                top-[47%]
                z-20
                hidden
                rotate-[-5deg]
                rounded-md
                bg-[#8B5CF6]
                px-2.5
                py-1.5
                text-[10px]
                font-medium
                text-white
                shadow-lg
                transition-transform
                duration-300

                sm:block

                group-hover/canvas:rotate-0
                group-hover/canvas:scale-105
              "
            >
              move this 2px?
            </div>

            {/* INTERACTIVE CANVAS */}

            <div className="absolute inset-0 z-[60] overflow-hidden">
              <AboutDesignCanvas
                activeTool={activeTool}
                onToolChange={setActiveTool}
              />
            </div>

            {/* TOOLBAR */}

            <div className="absolute left-1/2 top-[-2.1rem] z-[110] -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/35 sm:top-[-2.35rem] sm:text-[9px]">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.35)]" />
              <span className="italic text-white/50">Not just for show. Go ahead.</span>
            </div>

            <div
              data-canvas-control
              className="
                absolute
                left-1/2
                top-3
                z-[100]
                flex
                -translate-x-1/2
                items-center
                gap-0.5
                rounded-[10px]
                border
                border-white/10
                bg-[#181820]/95
                p-1
                shadow-xl
                backdrop-blur-md

                sm:top-4
                sm:gap-1
                sm:rounded-xl
                sm:p-1.5
              "
            >
              {[
                {
                  id: "pointer" as Tool,
                  icon: "↖",
                  label: "Move",
                },
                {
                  id: "frame" as Tool,
                  icon: "□",
                  label: "Frame",
                },
                {
                  id: "shape" as Tool,
                  icon: "○",
                  label: "Shape",
                },
                {
                  id: "text" as Tool,
                  icon: "T",
                  label: "Text",
                },
              ].map((tool) => {
                const isActive = activeTool === tool.id;

                return (
                  <button
                    key={tool.id}
                    type="button"
                    title={tool.label}
                    aria-label={`${tool.label} tool`}
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveTool(
                        isActive && tool.id !== "pointer"
                          ? "pointer"
                          : tool.id
                      );
                    }}
                    className={`
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-md
                      text-[11px]
                      transition-all
                      duration-200

                      sm:h-8
                      sm:w-8
                      sm:rounded-lg
                      sm:text-xs

                      ${
                        isActive
                          ? "bg-[#8B5CF6] text-white shadow-[0_5px_15px_rgba(139,92,246,0.3)]"
                          : "text-zinc-400 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    {tool.icon}
                  </button>
                );
              })}

              <div className="mx-0.5 h-4 w-px bg-white/10 sm:mx-1 sm:h-5" />

              <button
                type="button"
                aria-label="Decoration tool"
                title="Decoration"
                className="
                  flex
                  h-7
                  w-7
                  cursor-default
                  items-center
                  justify-center
                  rounded-md
                  text-[11px]
                  text-zinc-500

                  sm:h-8
                  sm:w-8
                  sm:rounded-lg
                  sm:text-xs
                "
              >
                ✎
              </button>
            </div>

            {/* BOTTOM LABELS */}

            <div className="pointer-events-none absolute bottom-3 left-3 z-20 text-[8px] tracking-[0.12em] text-zinc-600 min-[400px]:bottom-4 min-[400px]:left-4 sm:bottom-5 sm:left-5 sm:text-[10px] sm:tracking-[0.15em]">
              CANVAS · 72%
            </div>

            <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-1.5 text-[8px] text-zinc-600 min-[400px]:bottom-4 min-[400px]:right-4 sm:bottom-5 sm:right-5 sm:gap-2 sm:text-[10px]">
              <span className="h-1 w-1 rounded-full bg-[#8B5CF6] sm:h-1.5 sm:w-1.5" />

              <span className="hidden min-[360px]:inline">
                4 frames · draggable
              </span>

              <span className="min-[360px]:hidden">
                4 frames
              </span>
            </div>
          </div>

          {/* ==========================================
              EDITORIAL QUOTE
          ========================================== */}

          <div
            className={`
              relative
              mt-9
              max-w-[46rem]
              overflow-hidden
              border-l
              border-[#8B5CF6]/70
              pl-4

              transition-all
              delay-[500ms]
              duration-1000
              ease-[cubic-bezier(.16,1,.3,1)]

              sm:mt-11
              sm:pl-6

              md:mt-12
              md:pl-7

              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-1
                -top-5
                font-[family-name:var(--font-instrument-serif)]
                text-[65px]
                leading-none
                text-[#8B5CF6]/10

                sm:-top-7
                sm:text-[80px]

                md:-top-8
                md:text-[90px]
              "
            >
              “
            </span>

            <p
              className="
                relative
                font-[family-name:var(--font-instrument-serif)]
                text-[23px]
                italic
                leading-[1.25]
                text-zinc-200

                min-[400px]:text-[25px]

                sm:text-[28px]

                md:text-[32px]

                xl:text-[clamp(28px,2.1vw,34px)]
              "
            >
              The best details are often the ones people never
              consciously notice, but would definitely feel if they
              were missing.
            </p>
          </div>
        </div>

        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <div className="relative z-10 flex min-w-0 flex-col gap-5 sm:gap-7 md:gap-8">
          {/* ==========================================
              TIMELINE
          ========================================== */}

          <div
            className={`
              group/timeline
              relative
              rounded-[22px]
              border
              border-white/10
              bg-[#101017]/80
              p-5
              shadow-[0_20px_50px_rgba(0,0,0,0.25)]
              backdrop-blur-xl

              transition-all
              delay-200
              duration-1000
              ease-[cubic-bezier(.16,1,.3,1)]

              hover:border-[#8B5CF6]/40
              hover:shadow-[0_25px_70px_rgba(139,92,246,0.08)]

              sm:rounded-[28px]
              sm:p-7

              md:rounded-[32px]
              md:p-8

              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }
            `}
          >
            {/* CORNER HANDLES */}

            <span className="absolute -left-1 -top-1 h-2 w-2 scale-0 bg-white ring-1 ring-[#8B5CF6] transition-transform duration-200 group-hover/timeline:scale-100" />

            <span className="absolute -right-1 -top-1 h-2 w-2 scale-0 bg-white ring-1 ring-[#8B5CF6] transition-transform duration-200 group-hover/timeline:scale-100" />

            <span className="absolute -bottom-1 -left-1 h-2 w-2 scale-0 bg-white ring-1 ring-[#8B5CF6] transition-transform duration-200 group-hover/timeline:scale-100" />

            <span className="absolute -bottom-1 -right-1 h-2 w-2 scale-0 bg-white ring-1 ring-[#8B5CF6] transition-transform duration-200 group-hover/timeline:scale-100" />

            {/* DIMENSION LABEL */}

            <div
              className="
                pointer-events-none
                absolute
                -top-8
                right-5
                hidden
                translate-y-2
                rounded-md
                bg-[#8B5CF6]
                px-2
                py-1
                text-[9px]
                font-medium
                text-white
                opacity-0
                transition-all
                duration-200

                min-[1100px]:block

                group-hover/timeline:translate-y-0
                group-hover/timeline:opacity-100
              "
            >
              580 × 360
            </div>

            {/* TIMELINE LINE */}

            <div className="absolute left-[26px] top-8 h-[calc(100%-4rem)] w-px overflow-hidden bg-[#8B5CF6]/15 sm:left-[35px] sm:top-9 sm:h-[calc(100%-4.5rem)] md:left-[39px]">
              <div
                className={`
                  h-full
                  w-full
                  origin-top
                  bg-[#8B5CF6]
                  transition-transform
                  delay-500
                  duration-[1400ms]
                  ease-[cubic-bezier(.16,1,.3,1)]

                  ${
                    isVisible
                      ? "scale-y-100"
                      : "scale-y-0"
                  }
                `}
              />
            </div>

            {/* EDUCATION */}

            <div className="relative flex gap-4 sm:gap-5 md:gap-6">
              <div
                className={`
                  relative
                  z-10
                  mt-1.5
                  h-3
                  w-3
                  shrink-0
                  rounded-full
                  bg-[#8B5CF6]
                  shadow-[0_0_20px_rgba(139,92,246,0.4)]
                  transition-all
                  delay-500
                  duration-500

                  sm:mt-2
                  sm:h-4
                  sm:w-4

                  ${
                    isVisible ? "scale-100" : "scale-0"
                  }
                `}
              />

              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-[0.26em] text-zinc-500 sm:text-[10px] sm:tracking-[0.3em]">
                  PRESENT
                </span>

                <p className="mt-1 text-[16px] font-semibold text-white sm:text-lg">
                  Amity University, Noida
                </p>

                <p className="mt-1 text-[12.5px] leading-5 text-zinc-400 sm:text-sm">
                  Bachelor of Design · Product Design
                </p>

                <p className="mt-2 text-[11px] text-zinc-500 sm:text-[13px]">
                  2023 — Present
                </p>
              </div>
            </div>

            {/* EXPERIENCE */}

            <div className="relative mt-8 flex gap-4 sm:mt-10 sm:gap-5 md:gap-6">
              <div
                className={`
                  relative
                  z-10
                  mt-1.5
                  h-3
                  w-3
                  shrink-0
                  rounded-full
                  bg-[#8B5CF6]
                  shadow-[0_0_20px_rgba(139,92,246,0.4)]
                  transition-all
                  delay-700
                  duration-500

                  sm:mt-2
                  sm:h-4
                  sm:w-4

                  ${
                    isVisible ? "scale-100" : "scale-0"
                  }
                `}
              />

              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-[0.26em] text-zinc-500 sm:text-[10px] sm:tracking-[0.3em]">
                  RECENT EXPERIENCE
                </span>

                <p className="mt-1 text-[16px] font-semibold text-white sm:text-lg">
                  Zarle Infotech
                </p>

                <p className="mt-1 text-[12.5px] text-zinc-400 sm:text-sm">
                  UI/UX Design Intern
                </p>

                <p className="mt-2.5 max-w-md text-[12.5px] leading-6 text-zinc-500 sm:mt-3 sm:text-sm sm:leading-7">
                  Designing responsive experiences across healthcare,
                  wellness, furniture and consumer products.
                </p>
              </div>
            </div>
          </div>

          {/* ==========================================
              4 EXPANDING CAPABILITY CATEGORIES
          ========================================== */}

          <div
            className={`
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-white/10
              bg-[#101017]/75
              p-4
              shadow-[0_20px_50px_rgba(0,0,0,0.25)]
              backdrop-blur-xl

              transition-all
              delay-[350ms]
              duration-1000
              ease-[cubic-bezier(.16,1,.3,1)]

              min-[400px]:p-5

              sm:rounded-[28px]
              sm:p-7

              md:rounded-[32px]
              md:p-8

              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }
            `}
          >
            {/* SUBTLE BACKGROUND GLOW */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[#8B5CF6]/[0.08] blur-[70px]" />

            {/* HEADER */}

            <div className="relative z-10 mb-5 sm:mb-7">
              <p className="section-label">
                WHAT I WORK WITH
              </p>

              <p className="mt-3 max-w-md text-[12.5px] leading-6 text-zinc-500 sm:mt-4 sm:text-sm sm:leading-7">
                A toolkit shaped around thoughtful product design,
                user research and polished visual systems.
              </p>
            </div>

            {/* CAPABILITY ACCORDION */}

            <div className="relative z-10 flex flex-col gap-2">
              {capabilities.map((capability, index) => {
                const isActive = activeCapability === index;

                return (
                  <button
                    key={capability.title}
                    type="button"
                    aria-expanded={isActive}
                    onMouseEnter={() => handleCapabilityEnter(index)}
                    onClick={() => handleCapabilityClick(index)}
                    className={`
                      group/capability
                      relative
                      w-full
                      overflow-hidden
                      rounded-[14px]
                      border
                      text-left
                      transition-all
                      duration-500
                      ease-[cubic-bezier(.16,1,.3,1)]

                      sm:rounded-[16px]

                      ${
                        isActive
                          ? `
                            min-h-[174px]
                            border-[#8B5CF6]/45
                            bg-white/[0.055]
                            shadow-[0_18px_55px_rgba(139,92,246,0.10)]
                            backdrop-blur-xl

                            min-[400px]:min-h-[180px]
                            sm:min-h-[195px]
                          `
                          : `
                            min-h-[54px]
                            border-white/[0.07]
                            bg-white/[0.018]

                            sm:min-h-[58px]

                            hover:border-white/[0.14]
                            hover:bg-white/[0.035]
                          `
                      }
                    `}
                  >
                    {/* GLASS SHINE */}

                    <span
                      className={`
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white/30
                        to-transparent
                        transition-opacity
                        duration-500

                        ${
                          isActive ? "opacity-100" : "opacity-0"
                        }
                      `}
                    />

                    {/* ACTIVE GLOW */}

                    <span
                      className={`
                        pointer-events-none
                        absolute
                        -right-12
                        -top-16
                        h-36
                        w-36
                        rounded-full
                        bg-[#8B5CF6]/15
                        blur-[45px]
                        transition-opacity
                        duration-500

                        ${
                          isActive ? "opacity-100" : "opacity-0"
                        }
                      `}
                    />

                    {/* TOP ROW */}

                    <span className="relative z-10 flex min-h-[54px] items-center justify-between gap-3 px-3.5 sm:min-h-[58px] sm:gap-4 sm:px-4">
                      <span className="flex min-w-0 items-center gap-2.5 sm:gap-4">
                        <span
                          className={`
                            shrink-0
                            text-[9px]
                            font-medium
                            tracking-[0.14em]
                            transition-colors
                            duration-300

                            sm:text-[10px]
                            sm:tracking-[0.15em]

                            ${
                              isActive
                                ? "text-[#A78BFA]"
                                : "text-zinc-600"
                            }
                          `}
                        >
                          {capability.number}
                        </span>

                        <span
                          className={`
                            truncate
                            text-[13.5px]
                            font-medium
                            transition-colors
                            duration-300

                            sm:text-[15px]

                            ${
                              isActive
                                ? "text-white"
                                : "text-zinc-300"
                            }
                          `}
                        >
                          {capability.title}
                        </span>
                      </span>

                      <span
                        className={`
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          text-[11px]
                          transition-all
                          duration-500

                          sm:h-7
                          sm:w-7
                          sm:text-xs

                          ${
                            isActive
                              ? "rotate-45 border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#A78BFA]"
                              : "rotate-0 border-white/[0.08] text-zinc-600"
                          }
                        `}
                      >
                        +
                      </span>
                    </span>

                    {/* EXPANDED CONTENT */}

                    <span
                      className={`
                        relative
                        z-10
                        block
                        overflow-hidden
                        transition-all
                        duration-500
                        ease-[cubic-bezier(.16,1,.3,1)]

                        ${
                          isActive
                            ? "max-h-[200px] translate-y-0 opacity-100"
                            : "max-h-0 translate-y-3 opacity-0"
                        }
                      `}
                    >
                      <span className="block px-3.5 pb-4 sm:px-4">
                        <span className="block max-w-sm text-[11.5px] leading-5 text-zinc-500 sm:text-[13px] sm:leading-6">
                          {capability.description}
                        </span>

                        <span className="mt-3.5 flex flex-col gap-1.5 sm:mt-4">
                          {capability.skills.map(
                            (skill, skillIndex) => (
                              <span
                                key={skill}
                                className={`
                                  flex
                                  items-center
                                  gap-2
                                  rounded-lg
                                  border
                                  border-white/[0.05]
                                  bg-black/10
                                  px-2.5
                                  py-1.5
                                  text-[10.5px]
                                  text-zinc-300
                                  transition-all
                                  duration-500

                                  sm:gap-2.5
                                  sm:px-3
                                  sm:py-2
                                  sm:text-xs

                                  ${
                                    isActive
                                      ? "translate-x-0 opacity-100"
                                      : "-translate-x-3 opacity-0"
                                  }
                                `}
                                style={{
                                  transitionDelay: isActive
                                    ? `${100 + skillIndex * 70}ms`
                                    : "0ms",
                                }}
                              >
                                <span className="shrink-0 text-[#8B5CF6]">
                                  ◇
                                </span>

                                {skill}
                              </span>
                            )
                          )}
                        </span>
                      </span>
                    </span>

                    {/* META */}

                    <span
                      className={`
                        absolute
                        bottom-3
                        right-4
                        hidden
                        text-[8px]
                        uppercase
                        tracking-[0.16em]
                        text-zinc-700
                        transition-opacity
                        duration-300

                        min-[400px]:block

                        ${
                          isActive ? "opacity-100" : "opacity-0"
                        }
                      `}
                    >
                      {capability.meta}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* FOOTER */}

            <div className="relative z-10 mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3.5 text-[7.5px] uppercase tracking-[0.12em] text-zinc-700 min-[400px]:text-[8px] sm:mt-5 sm:pt-4 sm:text-[9px] sm:tracking-[0.18em]">
              <span>4 groups · 12 layers</span>

              <span className="hidden min-[360px]:inline">
                Auto layout · On
              </span>
            </div>
          </div>

          {/* ==========================================
              PERSONALITY CARD
          ========================================== */}

          <div
            className={`
              relative
              overflow-hidden
              rounded-[14px]
              border
              border-[#8B5CF6]/20
              bg-[#8B5CF6]/[0.055]
              px-4
              py-3.5

              transition-all
              delay-[500ms]
              duration-1000
              ease-[cubic-bezier(.16,1,.3,1)]

              hover:border-[#8B5CF6]/45
              hover:bg-[#8B5CF6]/[0.075]

              sm:rounded-2xl
              sm:px-5
              sm:py-4

              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <p className="text-[11.5px] leading-5 text-zinc-400 sm:text-sm">
                Current status: probably adjusting something by{" "}
                <span className="text-[#A78BFA]">
                  2px
                </span>{" "}
                again.
              </p>

              <span className="shrink-0 animate-pulse text-sm text-[#8B5CF6] sm:text-base">
                ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}