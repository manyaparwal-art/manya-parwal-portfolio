export default function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[8%] top-[12%] w-[136px] rounded-3xl border border-white/10 bg-white/5 p-3 text-xs text-white/80 shadow-xl shadow-black/5">
        <p className="font-semibold text-sm text-white">Component</p>
        <p className="mt-1 text-[11px] text-zinc-400">Button · Badge · Card</p>
      </div>

      <div className="absolute right-[10%] top-[8%] w-[120px] rounded-2xl border border-white/10 bg-[#1c1c2a]/80 p-2 text-[11px] text-white/75 backdrop-blur-sm">
        <p className="text-[10px] uppercase tracking-[0.2em] text-violet-300/70">AI prompt</p>
        <p className="mt-1 text-sm text-white/80">Generate micro interactions</p>
      </div>

      <div className="absolute left-[12%] bottom-[20%] w-[140px] rounded-2xl border border-white/10 bg-[#0f0f16]/80 p-3 text-[11px] text-white/70">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Code</p>
        <div className="mt-2 space-y-1 text-[10px] leading-4 text-white/80">
          <p>&lt;Button /&gt;</p>
          <p>const theme = </p>
          <p>&lt;style&gt;</p>
        </div>
      </div>

      <div className="absolute right-[18%] bottom-[22%] w-[96px] rounded-2xl border border-white/10 bg-[#1c1c2a]/75 p-3 text-[10px] text-white/70">
        <p className="font-semibold text-xs text-white">Sticky</p>
        <p className="mt-1 leading-4 text-zinc-400">Remember: align &amp; refine</p>
      </div>

      <div className="absolute left-[50%] top-[34%] h-px w-[120px] bg-violet-500/30" />

      <div className="absolute right-[22%] top-[42%] flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70">
        <span className="block h-2 w-2 rounded-full bg-white/80" />
        <span>↗</span>
      </div>

      <div className="absolute left-[22%] top-[52%] text-[10px] uppercase tracking-[0.3em] text-white/40">
        pixel perfect
      </div>

      <div className="absolute right-[12%] top-[58%] text-[18px] leading-none text-white/30">→</div>

      <div className="absolute left-[30%] bottom-[12%] w-[72px] rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/70">
        <div className="flex items-center justify-between gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          <span className="text-[10px]">42%</span>
        </div>
      </div>

      <div className="absolute right-[28%] bottom-[12%] h-px w-[88px] bg-violet-500/30" />
      <div className="absolute right-[32%] bottom-[11%] h-2 w-2 rounded-full bg-violet-500/40" />
      <div className="absolute right-[26%] bottom-[11%] h-2 w-2 rounded-full bg-violet-500/40" />
      <div className="absolute right-[20%] bottom-[11%] h-2 w-2 rounded-full bg-violet-500/40" />
    </div>
  );
}
