"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "manyaparwal@gmail.com";

function handleEmailClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.location.assign(`mailto:${EMAIL}`);
}

const socialLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/manya-parwal-530720290" },
  { label: "Behance", url: "https://www.behance.net/manyaparwal2912" },
];

export default function ContactSection() {
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
        threshold: 0.16,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden border-t border-white/10 px-6 py-24 text-white sm:px-8 sm:py-28 xl:px-16 xl:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-10 h-28 w-28 rounded-full bg-[#8B5CF6]/10 blur-3xl" />

      <div className="mx-auto max-w-screen-2xl">
        <p className={`section-label transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>LET'S MAKE SOMETHING GOOD</p>

        <div className="mt-5 grid gap-12 lg:grid-cols-[0.85fr_0.75fr] lg:items-start lg:gap-16">
          <div className="relative z-10">
            <h2 className={`section-heading max-w-2xl overflow-hidden text-[clamp(44px,4.8vw,64px)] leading-[0.92] transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <span className="block">Have an idea?</span>
              <span className="block italic text-[#8B5CF6]">Let's give it form.</span>
            </h2>
            <p className={`mt-8 max-w-xl text-sm leading-7 text-zinc-300 transition-all delay-100 duration-1000 ease-[cubic-bezier(.16,1,.3,1)] sm:text-[15px] sm:leading-8 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              I'm always open to thoughtful projects, interesting collaborations and conversations about design, products or ideas that are still figuring out what they want to become.
            </p>
          </div>

          <div className={`relative z-10 rounded-[36px] border border-white/10 bg-[#101017]/80 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all delay-150 duration-1000 ease-[cubic-bezier(.16,1,.3,1)] sm:p-8 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            <div className="flex flex-col gap-8">
              <a
                href={`mailto:${EMAIL}`}
                onClick={handleEmailClick}
                className="group inline-flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-[#171721]/90 px-6 py-5 text-left text-sm text-white transition duration-300 hover:border-[#8B5CF6]/40 hover:bg-[#1f1f2b]"
              >
                <div>
                  <p className="text-sm font-semibold">Say hello →</p>
                  <p className="mt-2 text-xs text-zinc-400">{EMAIL}</p>
                </div>
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              <div className="flex flex-col gap-3 sm:gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-zinc-300 transition duration-200 hover:text-white"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" />
                    <span>{link.label}</span>
                    <span className="text-[11px] text-[#8B5CF6] transition-transform duration-200 group-hover:translate-x-1">↗</span>
                  </a>
                ))}
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#111118]/80 p-5 text-sm text-zinc-300">
                <p className="font-semibold text-white">Designed with obsessive attention to detail</p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-zinc-500">Manya Parwal © 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
