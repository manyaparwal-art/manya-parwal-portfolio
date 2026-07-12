import Link from "next/link";

type HeroCardsProps = {
  isVisible: boolean;
};

const cards = [
  {
    number: "01",
    title: "User Research",
    subtitle: "Understanding people before designing solutions.",
    href: "#about",
  },
  {
    number: "02",
    title: "UI / Visual Design",
    subtitle: "Crafting thoughtful and meaningful interfaces.",
    href: "#selected-work",
  },
  {
    number: "03",
    title: "Design Systems",
    subtitle: "Creating scalable and consistent experiences.",
    href: "#contact",
  },
];

export default function HeroCards({
  isVisible,
}: HeroCardsProps) {
  return (
    <div className="w-full max-w-[520px] lg:max-w-[300px] xl:max-w-[330px] 2xl:max-w-[350px]">

      {/* SMALL LABEL */}
      <div
        className={`mb-5 flex items-center justify-between px-1 transition-[opacity,transform] delay-[500ms] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/25">
          What I work with
        </span>

        <span className="h-px w-10 bg-white/10" />
      </div>

      {/* CARDS */}
      <div className="flex flex-col gap-2.5">
        {cards.map((card, index) => {
          const delay = 580 + index * 110;

          return (
            <Link
              key={card.title}
              href={card.href}
              className={`group relative block cursor-pointer overflow-hidden rounded-[20px] border border-white/[0.075] bg-white/[0.025] px-5 py-4 backdrop-blur-sm transition-[opacity,transform,filter,border-color,background-color,box-shadow] duration-[850ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-[2px] hover:border-[#8B5CF6]/30 hover:bg-white/[0.045] hover:shadow-[0_18px_50px_rgba(0,0,0,.18)] sm:px-6 sm:py-5 lg:px-5 lg:py-4 xl:rounded-[22px] xl:px-6 xl:py-5 ${
                isVisible
                  ? "translate-x-0 translate-y-0 opacity-100 blur-0"
                  : "translate-y-7 opacity-0 blur-[4px] lg:translate-x-7"
              }`}
              style={{
                transitionDelay: `${delay}ms`,
              }}
            >
              {/* HOVER GLOW */}
              <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[#8B5CF6]/0 blur-[35px] transition-colors duration-500 group-hover:bg-[#8B5CF6]/10" />

              <div className="relative flex items-start gap-4">

                {/* NUMBER */}
                <span className="mt-1 text-[8px] tracking-[0.2em] text-[#8B5CF6]/60">
                  {card.number}
                </span>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-medium tracking-[-0.01em] text-white/90 sm:text-base lg:text-[14px] xl:text-base">
                    {card.title}
                  </h3>

                  <p className="mt-1.5 max-w-[240px] text-[12px] leading-5 text-white/32 transition-colors duration-500 group-hover:text-white/48 sm:text-[13px] lg:text-[11px] lg:leading-[1.65] xl:text-[12px]">
                    {card.subtitle}
                  </p>
                </div>

                {/* ARROW */}
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-[13px] text-white/35 transition-all duration-500 group-hover:translate-x-0.5 group-hover:border-[#8B5CF6]/35 group-hover:bg-[#8B5CF6]/10 group-hover:text-[#A98AFF]">
                  ↗
                </div>
              </div>

              {/* BOTTOM HOVER LINE */}
              <div className="absolute bottom-0 left-5 right-5 h-px overflow-hidden bg-white/[0.04]">
                <div className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#8B5CF6]/60 to-transparent transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}