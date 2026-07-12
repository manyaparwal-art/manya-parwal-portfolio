export default function CursorHint() {
  return (
    <div className="pointer-events-none absolute z-30 hidden md:block -left-[82px] bottom-[22px] lg:-left-[98px] lg:bottom-[34px] xl:-left-[118px] xl:bottom-[44px] 2xl:-left-[132px] 2xl:bottom-[54px]">
      {/* CURVED ARROW */}

      <svg
        width="82"
        height="58"
        viewBox="0 0 100 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-1 ml-auto opacity-40"
      >
        <path
          d="M8 60 C25 30, 50 18, 82 20"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="110"
          strokeDashoffset="0"
        />

        <path
          d="M73 13 L83 20 L74 28"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <p className="w-[140px] -rotate-3 text-center font-[family-name:var(--font-instrument-serif)] text-[15px] italic leading-[1.35] text-white/38 2xl:text-[16px]">
        move your cursor
        <br />
        to reveal the sketch
      </p>
    </div>
  );
}