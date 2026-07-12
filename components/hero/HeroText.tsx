type HeroTextProps = {
  isVisible: boolean;
};

export default function HeroText({
  isVisible,
}: HeroTextProps) {
  return (
    <div className="mx-auto w-full max-w-[580px] text-center lg:mx-0 lg:max-w-none lg:text-left">

      {/* SUBTITLE */}
      <div className="overflow-hidden">
        <p
          className={`hero-subtitle mb-7 text-[9px] font-medium uppercase tracking-[0.38em] text-white/40 transition-[opacity,transform,filter] delay-[100ms] duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:mb-8 sm:text-[10px] lg:mb-7 xl:text-[11px] ${
            isVisible
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-5 opacity-0 blur-[3px]"
          }`}
        >
          Product Designer
        </p>
      </div>

      {/* MAIN HEADING */}
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(52px,13vw,76px)] leading-[0.88] tracking-[-0.045em] text-white sm:text-[clamp(64px,10vw,88px)] md:text-[clamp(72px,9vw,100px)] lg:text-[clamp(58px,5.4vw,78px)] xl:text-[clamp(70px,5.5vw,92px)] 2xl:text-[100px]">

        {/* WHITE HEADING */}
        <span className="block overflow-hidden pb-[0.08em]">
          <span
            className={`block transition-[opacity,transform,filter] delay-[180ms] duration-[950ms] ease-[cubic-bezier(.16,1,.3,1)] ${
              isVisible
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-[105%] opacity-0 blur-[4px]"
            }`}
          >
            I design
            <br />
            experiences,
          </span>
        </span>

        {/* PURPLE ITALIC HEADING */}
        <span className="mt-[0.03em] block overflow-hidden pb-[0.1em]">
          <span
            className={`block italic text-[#8B5CF6] transition-[opacity,transform,filter] delay-[300ms] duration-[1000ms] ease-[cubic-bezier(.16,1,.3,1)] ${
              isVisible
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-[105%] opacity-0 blur-[5px]"
            }`}
          >
            not just
            <br />
            interfaces.
          </span>
        </span>
      </h1>

      {/* DESCRIPTION */}
      <p
        className={`hero-copy mx-auto mt-8 max-w-[470px] text-[15px] leading-7 text-white/42 transition-[opacity,transform,filter] delay-[440ms] duration-[850ms] ease-[cubic-bezier(.16,1,.3,1)] sm:mt-10 sm:text-[17px] sm:leading-8 lg:mx-0 lg:mt-8 lg:max-w-[360px] lg:text-[14px] lg:leading-7 xl:mt-10 xl:max-w-[430px] xl:text-[16px] xl:leading-8 ${
          isVisible
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-6 opacity-0 blur-[4px]"
        }`}
      >
        Creating thoughtful digital experiences that connect strategy,
        aesthetics and human behaviour.
      </p>

    </div>
  );
}