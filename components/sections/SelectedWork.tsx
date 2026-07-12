"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  {
    number: "01",
    title: "Easey",
    category: "CASE STUDY",
    tagline: "FROM CHAOS TO CLARITY",
    description:
      "A mobile food experience designed to reduce everyday decision fatigue and make choosing what to cook feel calmer.",
    image: "/easey-project-cover.png",
    href: "/easey.html",
    accent: "#D98565",
    note: "What should I cook?",
    frames: "24 frames",
    status: "Complete",
  },
  {
    number: "02",
    title: "Mamarise",
    category: "PRODUCT ECOSYSTEM",
    tagline: "SUPPORT FOR EVERY VERSION OF YOU",
    description:
      "A thoughtful digital ecosystem designed around wellness, parenting, career growth and meaningful community.",
    image: "/mamarise/mamarise-project-cover.png",
    href: "/mamarise.html",
    accent: "#B99AFF",
    note: "One space. Many parts of you.",
    frames: "38 frames",
    status: "Complete",
  },
  {
    number: "03",
    title: "Zenith",
    category: "WEB EXPERIENCE",
    tagline: "TIME, MADE TACTILE",
    description:
      "A luxury watch experience where motion, restraint and visual storytelling turn browsing into something more cinematic.",
    image: "/zenith-project-cover.png",
    href: "/zenith-case-study.html",
    accent: "#9B8CFF",
    note: "Details worth slowing down for.",
    frames: "18 frames",
    status: "Complete",
  },
  {
    number: "04",
    title: "Healthcare",
    category: "CLIENT WORK",
    tagline: "CLARITY WHERE IT MATTERS",
    description:
      "Responsive healthcare experiences shaped around trust, accessibility and information that feels easier to understand.",
    image: "/healthcare-project-cover.png",
    href: "/healthcare.html",
    accent: "#76C8D5",
    note: "Designed to feel less clinical.",
    frames: "32 frames",
    status: "Selected work",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function interpolate(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  if (inputMax === inputMin) return outputMin;

  const progress = clamp(
    (value - inputMin) / (inputMax - inputMin),
    0,
    1
  );

  return outputMin + (outputMax - outputMin) * progress;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  /* =======================================================
     RESPONSIVE MODE
  ======================================================= */

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setIsDesktop(query.matches);
    };

    update();

    query.addEventListener?.("change", update);

    return () => {
      query.removeEventListener?.("change", update);
    };
  }, []);

  /* =======================================================
     SECTION ENTRY ANIMATION
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasEntered(entry.isIntersecting);
      },
      {
        threshold: 0.04,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     BIDIRECTIONAL SCROLL PROGRESS
  ======================================================= */

  useEffect(() => {
    if (!isDesktop) return;

    let raf = 0;

    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const scrollableDistance =
        section.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = clamp(
        -rect.top / scrollableDistance,
        0,
        1
      );

      setScrollProgress(progress);

      const index = Math.min(
        projects.length - 1,
        Math.floor(progress * projects.length)
      );

      setActiveProject(index);
    };

    const handleScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDesktop]);

  /* =======================================================
     CURRENT PROJECT LOCAL PROGRESS
  ======================================================= */

  const projectProgress = useMemo(() => {
    const scaled = scrollProgress * projects.length;

    return scaled - Math.floor(scaled);
  }, [scrollProgress]);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="
        relative
        border-t
        border-white/[0.07]
        bg-[#08090f]
        text-white

        lg:min-h-[340vh]
      "
    >
      {/* ===================================================
          AMBIENT BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-full
            opacity-[0.16]
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="absolute -left-40 top-[15%] h-[420px] w-[420px] rounded-full bg-[#8B5CF6]/[0.08] blur-[130px]" />

        <div className="absolute -right-32 top-[45%] h-[380px] w-[380px] rounded-full bg-[#8B5CF6]/[0.06] blur-[130px]" />
      </div>

      {/* ===================================================
          DESKTOP / LAPTOP EXPERIENCE
      =================================================== */}

      <div
        className="
          hidden
          lg:sticky
          lg:top-0
          lg:flex
          lg:h-screen
          lg:min-h-[680px]
          lg:flex-col
          lg:overflow-hidden
          lg:px-10
          lg:pb-8
          lg:pt-8

          xl:px-14
          xl:pb-10
          xl:pt-10

          2xl:px-16
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div
          className={`
            relative
            z-30
            flex
            shrink-0
            items-end
            justify-between
            gap-8

            transition-all
            duration-1000
            ease-[cubic-bezier(.16,1,.3,1)]

            ${
              hasEntered
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          <div>
            <p className="section-label">
              SELECTED WORK
            </p>

            <h2
              className="
                mt-2
                font-[family-name:var(--font-geist)]
                text-[clamp(42px,4.3vw,72px)]
                font-medium
                leading-[0.92]
                tracking-[-0.055em]
                text-white
              "
            >
              Things I&apos;ve
              <span
                className="
                  ml-3
                  font-[family-name:var(--font-instrument-serif)]
                  font-normal
                  italic
                  text-[#8B5CF6]
                "
              >
                thought through.
              </span>
            </h2>
          </div>

          <div className="hidden items-center gap-3 pb-1 xl:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B5CF6]" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-zinc-600">
              Scroll to explore · {projects.length} projects
            </span>
          </div>
        </div>

        {/* =================================================
            WORKSPACE
        ================================================= */}

        <div
          className="
            relative
            mt-6
            min-h-0
            flex-1

            xl:mt-8
          "
        >
          {/* ===============================================
              LEFT PROJECT NAVIGATION
          =============================================== */}

          <div
            className="
              absolute
              left-0
              top-1/2
              z-40
              w-[190px]
              -translate-y-1/2

              xl:w-[220px]
            "
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-700">
                Pages
              </span>

              <span className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="space-y-1">
              {projects.map((project, index) => {
                const isActive = activeProject === index;

                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => {
                      const section = sectionRef.current;

                      if (!section) return;

                      const maxScroll =
                        section.offsetHeight -
                        window.innerHeight;

                      const target =
                        section.offsetTop +
                        (index / projects.length) *
                          maxScroll +
                        10;

                      window.scrollTo({
                        top: target,
                        behavior: "smooth",
                      });
                    }}
                    className={`
                      group
                      relative
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left

                      transition-all
                      duration-500

                      ${
                        isActive
                          ? "bg-white/[0.055]"
                          : "hover:bg-white/[0.025]"
                      }
                    `}
                  >
                    <span
                      className={`
                        text-[9px]
                        tracking-[0.12em]
                        transition-colors
                        duration-300

                        ${
                          isActive
                            ? "text-[#A78BFA]"
                            : "text-zinc-700"
                        }
                      `}
                    >
                      {project.number}
                    </span>

                    <span
                      className={`
                        text-[13px]
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? "translate-x-1 text-white"
                            : "text-zinc-600"
                        }
                      `}
                    >
                      {project.title}
                    </span>

                    {isActive && (
                      <span className="ml-auto h-1 w-1 rounded-full bg-[#8B5CF6]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-[8px] text-zinc-700">
                {String(activeProject + 1).padStart(2, "0")}
              </span>

              <div className="relative h-px flex-1 overflow-hidden bg-white/[0.06]">
                <div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    bg-[#8B5CF6]
                    transition-[width]
                    duration-300
                  "
                  style={{
                    width: `${
                      ((activeProject + 1) / projects.length) * 100
                    }%`,
                  }}
                />
              </div>

              <span className="text-[8px] text-zinc-700">
                04
              </span>
            </div>
          </div>

          {/* ===============================================
              STACKED FIGMA CANVAS
          =============================================== */}

          <div
            className="
              absolute
              bottom-0
              left-[210px]
              right-0
              top-0

              xl:left-[245px]
            "
          >
            {projects.map((project, index) => {
              const difference = index - activeProject;
              const isActive = difference === 0;

              const baseX =
                difference === 0
                  ? 0
                  : difference > 0
                  ? difference * 44
                  : difference * -28;

              const baseY =
                difference === 0
                  ? 0
                  : difference > 0
                  ? difference * 28
                  : difference * -18;

              const rotate =
                difference === 0
                  ? 0
                  : difference > 0
                  ? difference * 2.1
                  : difference * -1.4;

              const scale =
                difference === 0
                  ? 1
                  : Math.max(0.84, 1 - Math.abs(difference) * 0.055);

              const opacity =
                Math.abs(difference) > 2
                  ? 0
                  : isActive
                  ? 1
                  : 0.32;

              const isCaseStudyCard = Boolean(project.href);

              return (
                <article
                  key={project.title}
                  onClick={(event) => {
                    if (!isCaseStudyCard || !isActive) return;

                    const target = event.target as HTMLElement;

                    if (target.closest("a, button")) return;

                    router.push(project.href);
                  }}
                  onKeyDown={(event) => {
                    if (!isCaseStudyCard || !isActive) return;

                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      router.push(project.href);
                    }
                  }}
                  role={isCaseStudyCard && isActive ? "link" : undefined}
                  tabIndex={isCaseStudyCard && isActive ? 0 : undefined}
                  className="
                    absolute
                    inset-0
                    origin-center
                    cursor-pointer
                    select-none

                    transition-all
                    duration-[900ms]
                    ease-[cubic-bezier(.16,1,.3,1)]
                  "
                  style={{
                    zIndex: projects.length - Math.abs(difference),
                    opacity,
                    transform: `
                      translate3d(${baseX}px, ${baseY}px, 0)
                      rotate(${rotate}deg)
                      scale(${scale})
                    `,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div
                    className="
                      group/project
                      relative
                      mx-auto
                      h-full
                      max-h-[650px]
                      w-full
                      overflow-visible
                      rounded-[28px]
                      border
                      border-white/[0.1]
                      bg-[#111119]
                      shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                      transition-all
                      duration-300
                      ease-[cubic-bezier(.16,1,.3,1)]
                      group-hover/project:border-[#8B5CF6]/40
                      group-hover/project:shadow-[0_0_0_1px_rgba(139,92,246,0.24),0_35px_100px_rgba(0,0,0,0.5)]
                      group-active/project:scale-[0.995]
                      group-active/project:border-[#8B5CF6]/60
                    "
                  >
                    <div className="pointer-events-none absolute right-4 top-4 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.28em] text-white/70 opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover/project:opacity-100 group-hover/project:-translate-y-1 group-active/project:opacity-100">
                      <span>Open</span>
                      <span className="text-[11px]">↗</span>
                    </div>

                    {/* FIGMA LABEL */}

                    <div
                      className="
                        absolute
                        -top-[29px]
                        left-0
                        z-30
                        flex
                        h-[30px]
                        items-center
                        gap-2
                        rounded-t-lg
                        bg-[#8B5CF6]
                        px-3
                        text-[9px]
                        font-medium
                        tracking-[0.04em]
                        text-white
                      "
                    >
                      {project.title} / Hero Frame
                    </div>

                    {/* SELECTION HANDLES */}

                    {isActive && (
                      <>
                        <span className="absolute -left-1 -top-1 z-50 h-2 w-2 bg-white ring-1 ring-[#8B5CF6]" />
                        <span className="absolute -right-1 -top-1 z-50 h-2 w-2 bg-white ring-1 ring-[#8B5CF6]" />
                        <span className="absolute -bottom-1 -left-1 z-50 h-2 w-2 bg-white ring-1 ring-[#8B5CF6]" />
                        <span className="absolute -bottom-1 -right-1 z-50 h-2 w-2 bg-white ring-1 ring-[#8B5CF6]" />
                      </>
                    )}

                    {/* INNER FRAME */}

                    <div
                      className="
                        grid
                        h-full
                        min-h-0
                        overflow-hidden
                        rounded-[28px]

                        grid-cols-[0.72fr_1.28fr]

                        xl:grid-cols-[0.68fr_1.32fr]
                      "
                    >
                      {/* TEXT SIDE */}

                      <div
                        className="
                          relative
                          z-10
                          flex
                          min-w-0
                          flex-col
                          justify-between
                          overflow-hidden
                          border-r
                          border-white/[0.07]
                          bg-[#111119]
                          p-7

                          xl:p-9
                        "
                      >
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <span
                              className="
                                text-[9px]
                                uppercase
                                tracking-[0.25em]
                              "
                              style={{
                                color: project.accent,
                              }}
                            >
                              {project.number} · {project.category}
                            </span>

                            <span className="text-[8px] uppercase tracking-[0.15em] text-zinc-700">
                              {project.status}
                            </span>
                          </div>

                          <h3
                            className="
                              mt-10
                              font-[family-name:var(--font-instrument-serif)]
                              text-[clamp(48px,5vw,84px)]
                              leading-[0.88]
                              tracking-[-0.045em]
                              text-white

                              transition-transform
                              duration-700

                              group-hover/project:-translate-y-1
                            "
                          >
                            {project.title}
                          </h3>

                          <p
                            className="
                              mt-6
                              text-[9px]
                              uppercase
                              tracking-[0.28em]
                            "
                            style={{
                              color: project.accent,
                            }}
                          >
                            {project.tagline}
                          </p>

                          <p className="mt-8 max-w-[360px] text-[14px] leading-7 text-zinc-400">
                            {project.description}
                          </p>
                        </div>

                        <div>
                          <div className="mb-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                            <span className="text-[8px] uppercase tracking-[0.18em] text-zinc-700">
                              {project.frames}
                            </span>

                            <span className="text-[8px] uppercase tracking-[0.18em] text-zinc-700">
                              Auto layout · On
                            </span>
                          </div>

                          <Link
                            href={project.href}
                            className="
                              group/link
                              inline-flex
                              items-center
                              gap-3
                              text-[12px]
                              text-zinc-300
                              transition-colors
                              duration-300

                              hover:text-white
                            "
                          >
                            View case study

                            <span
                              className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/[0.1]

                                transition-all
                                duration-300

                                group-hover/link:translate-x-1
                                group-hover/link:border-[#8B5CF6]/50
                                group-hover/link:bg-[#8B5CF6]/10
                              "
                            >
                              ↗
                            </span>
                          </Link>
                        </div>
                      </div>

                      {/* IMAGE SIDE */}

                      <div className="relative min-w-0 overflow-hidden bg-[#16161d]">
                        <Image
                          src={project.image}
                          alt={`${project.title} project preview`}
                          fill
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding={index === 0 ? "sync" : "async"}
                          sizes="(min-width: 1024px) 65vw, 100vw"
                          className="
                            h-full
                            w-full
                            object-contain
                            object-center
                            transition-[opacity,transform]
                            duration-300
                            ease-[cubic-bezier(.16,1,.3,1)]

                            group-hover/project:scale-[1.015]
                          "
                          style={{ opacity: isActive ? 1 : 0.92, objectPosition: "center center" }}
                        />

                        {/* SOFT IMAGE OVERLAY */}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#111119]/30 via-transparent to-transparent" />

                        {/* ANNOTATION */}

                        <div
                          className="
                            absolute
                            right-5
                            top-5
                            z-20
                            rounded-xl
                            border
                            border-white/[0.12]
                            bg-black/20
                            px-3
                            py-2
                            text-[9px]
                            italic
                            text-white/70
                            shadow-xl
                            backdrop-blur-xl

                            transition-all
                            duration-500

                            group-hover/project:-translate-y-1
                            group-hover/project:bg-black/30
                          "
                        >
                          {project.note}
                        </div>

                        {/* COORDINATES */}

                        <div className="absolute bottom-5 right-5 z-20 text-[8px] uppercase tracking-[0.18em] text-black/35 mix-blend-difference">
                          X 1248 · Y 720
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================
          MOBILE + TABLET EXPERIENCE
      =================================================== */}

      <div
        className="
          relative
          z-10
          px-4
          py-20

          min-[400px]:px-5

          sm:px-8
          sm:py-24

          md:px-10
          md:py-28

          lg:hidden
        "
      >
        {/* MOBILE HEADER */}

        <div
          className={`
            transition-all
            duration-1000
            ease-[cubic-bezier(.16,1,.3,1)]

            ${
              hasEntered
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >
          <p className="section-label">
            SELECTED WORK
          </p>

          <h2
            className="
              mt-4
              max-w-[12ch]
              font-[family-name:var(--font-geist)]
              text-[42px]
              font-medium
              leading-[0.94]
              tracking-[-0.055em]

              min-[400px]:text-[46px]

              sm:max-w-[14ch]
              sm:text-[56px]

              md:text-[64px]
            "
          >
            Things I&apos;ve
            <span
              className="
                block
                font-[family-name:var(--font-instrument-serif)]
                font-normal
                italic
                text-[#8B5CF6]
              "
            >
              thought through.
            </span>
          </h2>

          <p className="mt-5 max-w-sm text-[13px] leading-6 text-zinc-500 sm:text-sm sm:leading-7">
            A few projects, experiments and systems I&apos;ve spent
            far too much time thinking about.
          </p>
        </div>

        {/* PROJECT DECK */}

        <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20">
          {projects.map((project, index) => (
            <MobileProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MOBILE PROJECT CARD
========================================================= */

function MobileProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, []);

  const isCaseStudyCard = Boolean(project.href);

  return (
    <article
      ref={cardRef}
      onClick={(event) => {
        if (!isCaseStudyCard) return;

        const target = event.target as HTMLElement;

        if (target.closest("a, button")) return;

        router.push(project.href);
      }}
      onKeyDown={(event) => {
        if (!isCaseStudyCard) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(project.href);
        }
      }}
      role={isCaseStudyCard ? "link" : undefined}
      tabIndex={isCaseStudyCard ? 0 : undefined}
      className={`
        relative
        transition-all
        duration-[900ms]
        ease-[cubic-bezier(.16,1,.3,1)]

        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }
      `}
    >
      {/* STACKED BACK FRAMES */}

      <div
        className="
          absolute
          inset-x-3
          -top-3
          bottom-3
          rotate-[1.5deg]
          rounded-[22px]
          border
          border-white/[0.06]
          bg-[#101017]

          sm:inset-x-5
          sm:-top-4
          sm:rounded-[26px]
        "
      />

      <div
        className="
          absolute
          inset-x-6
          -top-6
          bottom-6
          -rotate-[1deg]
          rounded-[22px]
          border
          border-white/[0.04]
          bg-[#0d0e14]

          sm:inset-x-9
          sm:-top-8
          sm:rounded-[26px]
        "
      />

      {/* FIGMA LABEL */}

      <div
        className="
          absolute
          -top-[27px]
          left-0
          z-30
          rounded-t-md
          bg-[#8B5CF6]
          px-2.5
          py-1.5
          text-[8px]
          font-medium
          text-white

          sm:-top-[29px]
          sm:px-3
          sm:text-[9px]
        "
      >
        {project.title} / Frame {index + 1}
      </div>

      {/* MAIN CARD */}

      <div
        className="
          group
          relative
          z-10
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.1]
          bg-[#111119]
          shadow-[0_24px_70px_rgba(0,0,0,0.38)]
          transition-all
          duration-300
          ease-[cubic-bezier(.16,1,.3,1)]
          group-hover:border-[#8B5CF6]/35
          group-hover:shadow-[0_0_0_1px_rgba(139,92,246,0.22),0_24px_70px_rgba(0,0,0,0.44)]
          group-active:scale-[0.995]
          group-active:border-[#8B5CF6]/55

          sm:rounded-[28px]
        "
      >
        <div className="pointer-events-none absolute right-3 top-3 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[8px] uppercase tracking-[0.28em] text-white/70 opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 group-active:opacity-100 sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[9px]">
          <span>Open</span>
          <span className="text-[10px] sm:text-[11px]">↗</span>
        </div>

        {/* HANDLES */}

        <span className="absolute -left-1 -top-1 z-50 h-2 w-2 bg-white ring-1 ring-[#8B5CF6]" />
        <span className="absolute -right-1 -top-1 z-50 h-2 w-2 bg-white ring-1 ring-[#8B5CF6]" />

        {/* IMAGE */}

        <div
          className="
            relative
            aspect-[4/3]
            overflow-hidden
            bg-[#16161d]

            sm:aspect-[16/10]
          "
        >
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="
              h-full
              w-full
              object-contain
              object-center
              transition-[opacity,transform]
              duration-300
              group-hover:scale-[1.01]
            "
            style={{ objectPosition: "center center" }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111119]/40 via-transparent to-transparent" />

          <div
            className="
              absolute
              bottom-3
              left-3
              rounded-lg
              border
              border-white/[0.1]
              bg-black/25
              px-2.5
              py-1.5
              text-[8px]
              italic
              text-white/70
              backdrop-blur-lg

              sm:bottom-4
              sm:left-4
              sm:px-3
              sm:py-2
              sm:text-[9px]
            "
          >
            {project.note}
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-5 min-[400px]:p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.22em]

                sm:text-[9px]
              "
              style={{
                color: project.accent,
              }}
            >
              {project.number} · {project.category}
            </span>

            <span className="text-[7px] uppercase tracking-[0.14em] text-zinc-700 sm:text-[8px]">
              {project.frames}
            </span>
          </div>

          <h3
            className="
              mt-6
              font-[family-name:var(--font-instrument-serif)]
              text-[44px]
              leading-none
              tracking-[-0.04em]
              text-white

              min-[400px]:text-[50px]

              sm:text-[64px]
            "
          >
            {project.title}
          </h3>

          <p
            className="
              mt-4
              text-[8px]
              uppercase
              tracking-[0.22em]

              sm:text-[9px]
            "
            style={{
              color: project.accent,
            }}
          >
            {project.tagline}
          </p>

          <p className="mt-5 max-w-xl text-[12.5px] leading-6 text-zinc-400 sm:text-sm sm:leading-7">
            {project.description}
          </p>

          <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
            <Link
              href={project.href}
              className="
                inline-flex
                items-center
                gap-2.5
                text-[11px]
                text-zinc-300

                sm:text-xs
              "
            >
              View case study

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.1]
                  text-[10px]
                "
              >
                ↗
              </span>
            </Link>

            <span className="text-[7px] uppercase tracking-[0.14em] text-zinc-700 sm:text-[8px]">
              Auto layout · On
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}