"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useRouter } from "next/navigation";

type PointerState = {
  x: number;
  y: number;
  nx: number;
  ny: number;
};

type MindNode = {
  id: string;
  label: string;
  sublabel: string;
  thought: string;
  x: number;
  y: number;
  size: "small" | "medium" | "large";
  accent: "purple" | "cyan" | "green";
};

const mindNodes: MindNode[] = [
  {
    id: "you",
    label: "You",
    sublabel: "where it begins",
    thought: "Every good experience starts with someone, not a screen.",
    x: 10,
    y: 38,
    size: "medium",
    accent: "purple",
  },
  {
    id: "question",
    label: "Question",
    sublabel: "what actually needs solving?",
    thought: "Wait, but what is the real problem here?",
    x: 32,
    y: 20,
    size: "small",
    accent: "cyan",
  },
  {
    id: "idea",
    label: "Idea",
    sublabel: "what if...",
    thought: "Okay, hear me out. What if we tried this?",
    x: 52,
    y: 38,
    size: "medium",
    accent: "purple",
  },
  {
    id: "refine",
    label: "Refine",
    sublabel: "yes, even the 2px",
    thought: "Maybe move it 2px. Yes, it absolutely matters.",
    x: 34,
    y: 68,
    size: "small",
    accent: "cyan",
  },
  {
    id: "impact",
    label: "Impact",
    sublabel: "people, not pixels",
    thought: "Does it actually make something easier for someone?",
    x: 74,
    y: 52,
    size: "large",
    accent: "green",
  },
];

const brainActivity = [
  { label: "27 Figma tabs open", accent: "#F08A80" },
  { label: "3 ideas fighting for attention", accent: "#A879FF" },
  { label: "1 interaction I'm probably overthinking", accent: "#63D2A4" },
];

const explorations = [
  { number: "01", label: "UI experiment", note: "made at 1:47 am", accent: "#A879FF" },
  { number: "02", label: "Rejected direction", note: "still kind of love it", accent: "#52C7EA" },
  { number: "03", label: "Random redesign", note: "nobody asked for this", accent: "#F08A80" },
  { number: "04", label: "Interaction test", note: "because why not?", accent: "#63D2A4" },
];

const nodeConnections: Record<string, string[]> = {
  you: ["path1", "path3"],
  question: ["path1", "path2"],
  idea: ["path2", "path4", "path5"],
  refine: ["path3", "path4"],
  impact: ["path5"],
};

function getAccentColor(accent: MindNode["accent"]) {
  if (accent === "purple") return "#A879FF";
  if (accent === "cyan") return "#52C7EA";
  return "#63D2A4";
}

export default function DesignBrain() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>("idea");
  const [mobileActiveNode, setMobileActiveNode] = useState<string>("idea");

  const [folderOpen, setFolderOpen] = useState(false);
  const [folderHovered, setFolderHovered] = useState(false);

  const [pointer, setPointer] = useState<PointerState>({
    x: 50,
    y: 50,
    nx: 0,
    ny: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!folderOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFolderOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [folderOpen]);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!experienceRef.current) return;
    const rect = experienceRef.current.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = requestAnimationFrame(() => {
      setPointer({ x: x * 100, y: y * 100, nx: x - 0.5, ny: y - 0.5 });
    });
  };

  const resetPointer = () => {
    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
    setPointer({ x: 50, y: 50, nx: 0, ny: 0 });
  };

  return (
    <>
      <section ref={sectionRef} id="design-brain" className="relative overflow-hidden border-y border-white/[0.07] bg-[#08090F] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="pointer-events-none absolute -left-40 top-[20%] h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/[0.055] blur-[170px]" />
        <div className="pointer-events-none absolute -right-40 bottom-[5%] h-[500px] w-[500px] rounded-full bg-[#52C7EA]/[0.035] blur-[170px]" />
        <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 py-20 min-[400px]:px-5 sm:px-8 sm:py-24 md:px-10 md:py-28 lg:px-12 lg:py-28 xl:px-16 2xl:px-20">
          <div className={`mb-8 flex items-center gap-4 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:mb-10 md:mb-12 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
            <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#A879FF] sm:text-[9px] sm:tracking-[0.32em]">04 / Inside the process</span>
            <span className="h-px w-10 bg-[#A879FF]/35 sm:w-14" />
          </div>

          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-10 xl:mb-14">
            <h2 className={`max-w-[720px] text-[42px] font-medium leading-[0.9] tracking-[-0.06em] transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)] min-[400px]:text-[46px] sm:text-[56px] md:text-[68px] lg:text-[clamp(58px,5.6vw,88px)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              This is how my
              <span className="block font-[family-name:var(--font-instrument-serif)] font-normal italic text-zinc-500">brain connects dots.</span>
            </h2>
            <div className={`transition-all delay-100 duration-1000 ease-[cubic-bezier(.16,1,.3,1)] lg:pb-2 lg:text-right ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <p className="max-w-[420px] text-[12.5px] leading-6 text-zinc-500 sm:text-[14px] sm:leading-8 lg:ml-auto">Somewhere between a question, too many iterations and one very specific 2px adjustment, an idea starts feeling right.</p>
            </div>
          </div>

          <div ref={experienceRef} onMouseMove={handleMouseMove} onMouseLeave={resetPointer} className={`relative overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#0B0D13]/90 shadow-[0_35px_120px_rgba(0,0,0,.38)] transition-all delay-200 duration-1000 ease-[cubic-bezier(.16,1,.3,1)] sm:rounded-[26px] lg:rounded-[30px] ${isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-[0.985] opacity-0"}`} style={{ perspective: "1400px" }}>
            <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block" style={{ background: `radial-gradient(420px circle at ${pointer.x}% ${pointer.y}%, rgba(139,92,246,.075), transparent 58%)` }} />
            <div className="hidden min-h-[570px] lg:grid lg:grid-cols-[0.23fr_0.49fr_0.28fr]">
              <button type="button" onClick={() => router.push("/work/design-explorations")} onMouseEnter={() => setFolderHovered(true)} onMouseLeave={() => setFolderHovered(false)} className="group relative z-30 flex min-w-0 flex-col justify-between overflow-hidden border-r border-white/[0.07] p-7 text-left xl:p-10">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-zinc-700 xl:text-[8px] xl:tracking-[0.3em]">My messy folder</span>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.18em] text-zinc-600">27 files</span>
                  </div>
                  <h3 className="mt-8 font-[family-name:var(--font-instrument-serif)] text-[clamp(32px,2.8vw,54px)] leading-[0.92] tracking-[-0.04em] text-zinc-200">Things I made<span className="block italic text-[#A879FF]">just to see</span>what happens.</h3>
                  <div className="mt-7 h-px w-16 bg-white/[0.1]" />
                  <p className="mt-5 max-w-[245px] text-[10.5px] leading-6 text-zinc-600 xl:text-[11px]">Half-finished ideas, random UI experiments, rejected directions and things that never needed a case study.</p>
                  <div className="relative mt-8 h-[105px]">
                    {explorations.slice(0, 3).map((item, index) => {
                      const positions = [
                        { left: "0%", top: "20px", rotate: folderHovered ? -11 : -4, y: folderHovered ? -8 : 0 },
                        { left: "24%", top: "5px", rotate: folderHovered ? 0 : 2, y: folderHovered ? -15 : 0 },
                        { left: "48%", top: "24px", rotate: folderHovered ? 11 : 5, y: folderHovered ? -7 : 0 },
                      ];
                      const position = positions[index];
                      return (
                        <div key={item.number} className="absolute h-[78px] w-[105px] rounded-[10px] border border-white/[0.1] bg-[#11141C] p-3 shadow-[0_15px_35px_rgba(0,0,0,.35)] transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]" style={{ left: position.left, top: position.top, transform: `rotate(${position.rotate}deg) translateY(${position.y}px)`, zIndex: index + 1 }}>
                          <span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
                          <span className="mt-5 block font-mono text-[6px] uppercase tracking-[0.12em] text-zinc-600">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.07] pt-5">
                  <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-500 transition-colors duration-300 group-hover:text-[#A879FF]">Open the folder</span>
                  <span className="text-lg text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#A879FF]">↗</span>
                </div>
              </button>
              <div className="relative overflow-hidden border-r border-white/[0.07]">
                <div className="absolute left-7 top-7 z-20"><span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-700">It rarely goes in a straight line</span></div>
                <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px", transform: `translate3d(${pointer.nx * -5}px, ${pointer.ny * -5}px, 0)` }} />
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 570" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="brainLine" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.18" />
                      <stop offset="50%" stopColor="#A879FF" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#52C7EA" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="brainGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>
                  {[{ id: "path1", d: "M100 250 C170 170 220 130 270 120" }, { id: "path2", d: "M270 120 C360 120 370 220 420 240" }, { id: "path3", d: "M100 250 C180 340 210 400 290 405" }, { id: "path4", d: "M290 405 C390 390 380 300 420 240" }, { id: "path5", d: "M420 240 C530 210 570 300 610 320" }].map((path) => {
                    const isConnected = activeNode !== null && nodeConnections[activeNode]?.includes(path.id);
                    return <path key={path.id} id={path.id} d={path.d} fill="none" stroke={isConnected ? "#A879FF" : "url(#brainLine)"} strokeWidth={isConnected ? "2.2" : "1.2"} strokeDasharray={path.id === "path5" ? undefined : "5 7"} opacity={isConnected ? 0.95 : 0.48} filter={isConnected ? "url(#brainGlow)" : undefined} style={{ transition: "stroke .4s ease, stroke-width .4s ease, opacity .4s ease" }} />;
                  })}
                  <circle r="4" fill="#A879FF" filter="url(#brainGlow)"><animateMotion dur="4.5s" repeatCount="indefinite"><mpath href="#path1" /></animateMotion></circle>
                  <circle r="3" fill="#52C7EA" filter="url(#brainGlow)"><animateMotion dur="5.5s" begin="1s" repeatCount="indefinite"><mpath href="#path2" /></animateMotion></circle>
                  <circle r="4" fill="#A879FF" filter="url(#brainGlow)"><animateMotion dur="6s" begin=".5s" repeatCount="indefinite"><mpath href="#path4" /></animateMotion></circle>
                  <circle r="5" fill="#63D2A4" filter="url(#brainGlow)"><animateMotion dur="4s" begin=".8s" repeatCount="indefinite"><mpath href="#path5" /></animateMotion></circle>
                </svg>
                {mindNodes.map((node, index) => { const isActive = activeNode === node.id; const accentColor = getAccentColor(node.accent); const sizeClasses = node.size === "large" ? "min-w-[140px] px-6 py-4" : node.size === "medium" ? "min-w-[112px] px-5 py-3.5" : "min-w-[100px] px-4 py-3"; return <button key={node.id} type="button" onMouseEnter={() => setActiveNode(node.id)} onFocus={() => setActiveNode(node.id)} onClick={() => setActiveNode(node.id)} className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border text-center backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${sizeClasses} ${isActive ? "border-white/[0.22] bg-white/[0.095]" : "border-white/[0.09] bg-[#10131B]/85 hover:border-white/[0.16]"}`} style={{ left: `${node.x}%`, top: `${node.y}%`, boxShadow: isActive ? `0 0 55px ${accentColor}28` : "0 18px 45px rgba(0,0,0,.3)", transform: `translate(-50%, -50%) translate3d(${pointer.nx * (7 + index * 2)}px, ${pointer.ny * (7 + index * 2)}px, ${index * 8}px) scale(${isActive ? 1.1 : 1})`, transition: "transform 450ms cubic-bezier(.16,1,.3,1), background-color 400ms ease, border-color 400ms ease, box-shadow 400ms ease" }}><span className="block font-[family-name:var(--font-instrument-serif)] text-[18px] italic transition-colors duration-300" style={{ color: isActive ? accentColor : "#d4d4d8" }}>{node.label}</span><span className={`block overflow-hidden font-mono text-[6px] uppercase tracking-[0.15em] text-zinc-600 transition-all duration-400 ${isActive ? "mt-2 max-h-8 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>{node.sublabel}</span></button>; })}
                <div className={`pointer-events-none absolute bottom-7 left-1/2 z-30 w-[min(84%,390px)] -translate-x-1/2 rounded-[14px] border border-white/[0.08] bg-[#11141C]/80 px-4 py-3 text-center shadow-[0_18px_50px_rgba(0,0,0,.3)] backdrop-blur-xl transition-all duration-500 ${activeNode ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}><span className="font-[family-name:var(--font-instrument-serif)] text-[13px] italic text-zinc-500">“{mindNodes.find((node) => node.id === activeNode)?.thought}”</span></div>
                <div className="pointer-events-none absolute z-30 hidden rounded-md border border-white/[0.07] bg-[#12151D]/90 px-2 py-1 font-mono text-[7px] tracking-[0.08em] text-zinc-700 xl:block" style={{ left: `${Math.min(pointer.x + 2, 84)}%`, top: `${Math.min(pointer.y + 3, 90)}%` }}>X {Math.round(pointer.x * 8)} · Y {Math.round(pointer.y * 5.7)}</div>
              </div>
              <div className="relative overflow-hidden p-7 xl:p-10"><div className="relative z-20"><span className="font-mono text-[7px] uppercase tracking-[0.25em] text-zinc-700 xl:text-[8px] xl:tracking-[0.3em]">Currently orbiting my brain</span></div><div className="absolute inset-x-0 top-[72px] flex justify-center"><WorldOrb pointer={pointer} /></div><div className="absolute bottom-9 left-7 right-7 space-y-4 xl:left-10 xl:right-10">{brainActivity.map((item, index) => <div key={item.label} className="flex items-center gap-3 transition-transform duration-300 ease-out" style={{ transform: `translateX(${pointer.nx * (index + 1) * 5}px)` }}><span className="h-1.5 w-1.5 flex-none rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: item.accent, color: item.accent }} /><span className="text-[9px] leading-4 text-zinc-500 xl:text-[10px]">{item.label}</span></div>)}</div></div>
            </div>
            <div className="space-y-4 p-4 sm:space-y-5 sm:p-6 lg:hidden">
              <button type="button" onClick={() => router.push("/work/design-explorations")} className="group w-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5 text-left transition-all duration-500 active:scale-[0.99] sm:rounded-[22px] sm:p-6 md:p-8">
                <div className="flex items-center justify-between"><span className="font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-700 sm:text-[8px] sm:tracking-[0.25em]">My messy folder</span><span className="font-mono text-[7px] uppercase tracking-[0.18em] text-zinc-600">27 files</span></div>
                <div className="md:grid md:grid-cols-[1fr_0.8fr] md:items-end md:gap-8"><div><h3 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-[38px] leading-[0.95] sm:text-[44px] md:text-[52px]">Things I made<span className="block italic text-[#A879FF]">just to see</span>what happens.</h3><p className="mt-5 max-w-sm text-[11px] leading-6 text-zinc-600">Half-finished ideas, random UI experiments and things that never needed a case study.</p></div><div className="relative mt-7 hidden h-[120px] md:block">{explorations.slice(0, 3).map((item, index) => { const positions = [{ left: "0%", top: "25px", rotate: -7 }, { left: "28%", top: "4px", rotate: 1 }, { left: "56%", top: "28px", rotate: 7 }]; const position = positions[index]; return <div key={item.number} className="absolute h-[88px] w-[115px] rounded-xl border border-white/[0.1] bg-[#11141C] p-3 shadow-xl" style={{ left: position.left, top: position.top, transform: `rotate(${position.rotate}deg)`, zIndex: index + 1 }}><span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent }} /><span className="mt-6 block font-mono text-[6px] uppercase tracking-[0.12em] text-zinc-600">{item.label}</span></div>; })}</div></div><div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-5"><span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-500">Open the folder</span><span className="text-[#A879FF] transition-transform duration-300 group-active:translate-x-1 group-active:-translate-y-1">↗</span></div></button>
              <div className="relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5 sm:rounded-[22px] sm:p-6 md:p-8"><span className="font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-700 sm:text-[8px] sm:tracking-[0.25em]">It rarely goes in a straight line</span><div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} /><div className="relative z-10 mt-8"><div className="flex flex-wrap gap-2.5 sm:gap-3">{mindNodes.map((node) => { const isActive = mobileActiveNode === node.id; const accentColor = getAccentColor(node.accent); return <button key={node.id} type="button" onClick={() => setMobileActiveNode(node.id)} className={`rounded-full border px-4 py-2.5 font-[family-name:var(--font-instrument-serif)] text-[16px] italic backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] sm:px-5 sm:py-3 sm:text-[18px] ${isActive ? "scale-[1.04] border-white/[0.2] bg-white/[0.09]" : "border-white/[0.09] bg-[#10131B]/80 text-zinc-400"}`} style={{ color: isActive ? accentColor : undefined, boxShadow: isActive ? `0 0 35px ${accentColor}20` : undefined }}>{node.label}</button>; })}</div><div key={mobileActiveNode} className="mt-5 overflow-hidden rounded-[16px] border border-white/[0.07] bg-[#0D1017]/75 p-4 backdrop-blur-xl sm:p-5" style={{ animation: "brainThoughtEnter .5s cubic-bezier(.16,1,.3,1)" }}><div className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: getAccentColor(mindNodes.find((node) => node.id === mobileActiveNode)?.accent ?? "purple") }} /><div><span className="block font-mono text-[7px] uppercase tracking-[0.18em] text-zinc-700">{mindNodes.find((node) => node.id === mobileActiveNode)?.sublabel}</span><p className="mt-2 font-[family-name:var(--font-instrument-serif)] text-[17px] italic leading-6 text-zinc-400 sm:text-[19px]">“{mindNodes.find((node) => node.id === mobileActiveNode)?.thought}”</p></div></div></div></div></div>
              <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025] sm:min-h-[470px] sm:rounded-[22px] md:min-h-[520px]"><div className="absolute left-5 top-5 sm:left-6 sm:top-6"><span className="font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-700 sm:text-[8px] sm:tracking-[0.25em]">Currently orbiting my brain</span></div><div className="scale-[0.82] sm:scale-100"><WorldOrb pointer={{ x: 50, y: 50, nx: 0, ny: 0 }} /></div><div className="absolute bottom-6 left-5 right-5 space-y-3 sm:bottom-7 sm:left-7 sm:right-7">{brainActivity.map((item) => <div key={item.label} className="flex items-center gap-3"><span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.accent }} /><span className="text-[9px] text-zinc-500 sm:text-[10px]">{item.label}</span></div>)}</div></div>
            </div>
          </div>
          <div className={`relative overflow-hidden border-b border-white/[0.07] py-10 transition-all delay-300 duration-1000 ease-[cubic-bezier(.16,1,.3,1)] sm:py-14 lg:py-16 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:items-end">
              <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-zinc-700 sm:text-[8px] sm:tracking-[0.28em]">A very accurate summary</span>
              <p className="max-w-[1000px] font-[family-name:var(--font-instrument-serif)] text-[27px] leading-[1.06] tracking-[-0.035em] text-zinc-500 sm:text-[34px] md:text-[40px] lg:text-[clamp(36px,3vw,48px)]">Somewhere between curiosity, too many iterations, and<span className="text-zinc-200"> one last 2px adjustment</span><span className="text-[#A879FF]"> — </span>something starts to feel right.</p>
            </div>
          </div>
        </div>
        <style jsx global>{`
          @keyframes brainOrbFloat { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
          @keyframes brainOrbPulse { 0%, 100% { opacity: 0.45; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.12); } }
          @keyframes orbitDotOne { from { transform: rotate(0deg) translateX(125px) rotate(0deg); } to { transform: rotate(360deg) translateX(125px) rotate(-360deg); } }
          @keyframes orbitDotTwo { from { transform: rotate(120deg) translateX(105px) rotate(-120deg); } to { transform: rotate(480deg) translateX(105px) rotate(-480deg); } }
          @keyframes folderEnter { from { opacity: 0; transform: scale(0.96) translateY(18px); } to { opacity: 1; transform: scale(1) translateY(0); } }
          @keyframes brainThoughtEnter { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @media (prefers-reduced-motion: reduce) { #design-brain *, #design-brain *::before, #design-brain *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
        `}</style>
      </section>
      {folderOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-xl md:p-6" onClick={() => setFolderOpen(false)}>
          <div className="relative flex h-[calc(100vh-24px)] w-full max-w-[1600px] flex-col overflow-hidden rounded-[24px] border border-white/[0.1] bg-[#0A0C12] shadow-[0_40px_160px_rgba(0,0,0,.7)] md:h-[calc(100vh-48px)] md:rounded-[28px]" style={{ animation: "folderEnter .5s cubic-bezier(.16,1,.3,1)" }} onClick={(event) => event.stopPropagation()}>
            <div className="flex flex-none items-center justify-between border-b border-white/[0.08] px-4 py-4 sm:px-5 md:px-8 md:py-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#A879FF] shadow-[0_0_12px_#A879FF]" />
                <div>
                  <span className="block font-mono text-[7px] uppercase tracking-[0.24em] text-zinc-500 sm:text-[8px] sm:tracking-[0.28em]">My messy folder</span>
                  <span className="mt-1 hidden text-[10px] text-zinc-700 min-[380px]:block">Things that never needed a full case study.</span>
                </div>
              </div>
              <button type="button" onClick={() => setFolderOpen(false)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-sm text-zinc-500 transition-all duration-300 hover:rotate-90 hover:border-white/[0.2] hover:text-white sm:h-10 sm:w-10" aria-label="Close messy folder">✕</button>
            </div>
            <div className="relative flex-1 overflow-y-auto p-4 sm:p-5 md:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)`, backgroundSize: "52px 52px" }} />
              <div className="relative z-10">
                <div className="mb-10 max-w-[800px] sm:mb-14">
                  <span className="font-mono text-[7px] uppercase tracking-[0.24em] text-[#A879FF] sm:text-[8px] sm:tracking-[0.3em]">Experiments / rough work / happy accidents</span>
                  <h3 className="mt-5 font-[family-name:var(--font-instrument-serif)] text-[42px] leading-[0.9] tracking-[-0.05em] text-zinc-200 sm:text-[58px] md:text-[76px] lg:text-[clamp(70px,7vw,100px)]">Not everything needs<span className="block italic text-zinc-600">a case study.</span></h3>
                  <p className="mt-6 max-w-[520px] text-[11px] leading-6 text-zinc-600 sm:mt-7 sm:text-[12px] sm:leading-7">Some things started as a random thought. Some were rejected. Some are unfinished. I kept them anyway.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {explorations.map((item, index) => (
                    <article key={item.number} className={`group relative overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#10131A] transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.16] sm:rounded-[22px] ${index % 2 === 1 ? "xl:translate-y-12" : ""}`}>
                      <div className="relative aspect-[4/5] overflow-hidden border-b border-white/[0.07] bg-[#0C0E14]">
                        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(circle, ${item.accent} 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
                        <div className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] transition-all duration-700 group-hover:scale-150" style={{ backgroundColor: `${item.accent}22` }} />
                        <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.accent, boxShadow: `0 0 14px ${item.accent}` }} /><span className="font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">File {item.number}</span></div>
                        <div className="absolute bottom-6 left-5 right-5 top-[28%] overflow-hidden rounded-[14px] border border-white/[0.1] bg-[#12151D]/90 shadow-[0_20px_60px_rgba(0,0,0,.4)] transition-transform duration-700 group-hover:scale-[1.04] group-hover:-rotate-1 sm:bottom-7 sm:left-7 sm:right-7">
                          <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.07] px-3"><span className="h-1.5 w-1.5 rounded-full bg-white/[0.1]" /><span className="h-1.5 w-1.5 rounded-full bg-white/[0.1]" /><span className="h-1.5 w-1.5 rounded-full bg-white/[0.1]" /></div>
                          <div className="p-4"><div className="h-2 w-[38%] rounded-full bg-white/[0.08]" /><div className="mt-3 h-8 w-[75%] rounded-md bg-white/[0.055]" /><div className="mt-4 grid grid-cols-2 gap-2"><div className="h-16 rounded-lg opacity-30" style={{ backgroundColor: item.accent }} /><div className="h-16 rounded-lg bg-white/[0.04]" /></div></div>
                        </div>
                      </div>
                      <div className="p-5"><div className="flex items-start justify-between gap-4"><div><h4 className="text-[13px] text-zinc-300">{item.label}</h4><p className="mt-2 font-[family-name:var(--font-instrument-serif)] text-sm italic text-zinc-700">{item.note}</p></div><span className="text-zinc-700 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#A879FF]">↗</span></div></div>
                    </article>
                  ))}
                </div>
                <p className="mt-14 text-center font-[family-name:var(--font-instrument-serif)] text-lg italic text-zinc-700 sm:mt-20 sm:text-xl">more experiments are probably being made right now.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WorldOrb({ pointer }: { pointer: PointerState }) {
  return (
    <div className="relative h-[310px] w-[310px] transition-transform duration-300 ease-out" style={{ transform: `rotateX(${-pointer.ny * 12}deg) rotateY(${pointer.nx * 16}deg)`, transformStyle: "preserve-3d" }}>
      <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] rounded-full bg-[#8B5CF6]/10 blur-[55px]" style={{ animation: "brainOrbPulse 5s ease-in-out infinite" }} />
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.13]" style={{ animation: "brainOrbFloat 7s ease-in-out infinite", boxShadow: "inset 0 0 45px rgba(139,92,246,.06), 0 0 60px rgba(139,92,246,.08)" }}>
        <div className="absolute inset-[18%] rounded-[50%] border border-white/[0.1]" />
        <div className="absolute left-1/2 top-0 h-full w-[42%] -translate-x-1/2 rounded-[50%] border border-white/[0.11]" />
        <div className="absolute left-1/2 top-0 h-full w-[72%] -translate-x-1/2 rounded-[50%] border border-white/[0.07]" />
        <div className="absolute left-0 top-[25%] h-[18%] w-full rounded-[50%] border-y border-white/[0.1]" />
        <div className="absolute left-0 top-[44%] h-[12%] w-full rounded-[50%] border-y border-white/[0.12]" />
        <div className="absolute bottom-[25%] left-0 h-[18%] w-full rounded-[50%] border-y border-white/[0.08]" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.13] to-transparent" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/[0.13] to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A879FF] shadow-[0_0_12px_#A879FF,0_0_30px_rgba(168,121,255,.8),0_0_70px_rgba(139,92,246,.45)]" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A879FF]/20" />
        {[["24%", "28%", "#F08A80"], ["72%", "31%", "#A879FF"], ["64%", "68%", "#63D2A4"], ["31%", "72%", "#52C7EA"], ["81%", "52%", "#F08A80"], ["45%", "17%", "#A879FF"]].map(([left, top, color], index) => <span key={index} className="absolute h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ left, top, backgroundColor: color, color }} />)}
      </div>
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] rounded-full border border-white/[0.07]" />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#A879FF] shadow-[0_0_14px_#A879FF]" style={{ animation: "orbitDotOne 12s linear infinite" }} />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#52C7EA] shadow-[0_0_12px_#52C7EA]" style={{ animation: "orbitDotTwo 16s linear infinite" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 backdrop-blur-xl"><span className="font-mono text-[7px] uppercase tracking-[0.24em] text-zinc-600">current brain activity · questionable</span></div>
    </div>
  );
}
