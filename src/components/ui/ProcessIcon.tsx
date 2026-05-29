import type { ProcessStep } from "@/data/process";

const icons: Record<ProcessStep["icon"], React.ReactNode> = {
  select: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  blend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4h8l-1 16H9L8 4zM10 8h4" />
      <path strokeLinecap="round" d="M6 12h12" />
    </svg>
  ),
  pack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8-4 8 4v12l-8 4-8-4V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v20M4 8l8 4 8-4" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.4 4.8L20 9l-3.8 3.7L17 20l-5-2.6L7 20l.8-7.3L4 9l5.6-1.2L12 3z" />
    </svg>
  ),
};

interface ProcessIconProps {
  type: ProcessStep["icon"];
}

export function ProcessIcon({ type }: ProcessIconProps) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-beige text-earth [&_svg]:h-6 [&_svg]:w-6">
      {icons[type]}
    </div>
  );
}
