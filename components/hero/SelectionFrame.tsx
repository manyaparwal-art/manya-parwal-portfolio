interface SelectionFrameProps {
  className?: string;
}

export default function SelectionFrame({ className = "" }: SelectionFrameProps) {
  return (
    <div
      className={`relative rounded-[32px] border border-[var(--color-accent-purple)]/50 bg-transparent ${className}`}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute left-1 top-1 h-2.5 w-2.5 rounded-full bg-[var(--color-accent-purple)]/90" />
      <div className="pointer-events-none absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[var(--color-accent-purple)]/90" />
      <div className="pointer-events-none absolute left-1 bottom-1 h-2.5 w-2.5 rounded-full bg-[var(--color-accent-purple)]/90" />
      <div className="pointer-events-none absolute right-1 bottom-1 h-2.5 w-2.5 rounded-full bg-[var(--color-accent-purple)]/90" />

      <div className="pointer-events-none absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-accent-purple)]/90" />
      <div className="pointer-events-none absolute left-1/2 bottom-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-accent-purple)]/90" />
      <div className="pointer-events-none absolute left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--color-accent-purple)]/90" />
      <div className="pointer-events-none absolute right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--color-accent-purple)]/90" />
    </div>
  );
}
