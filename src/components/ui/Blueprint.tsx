import type { ReactNode } from 'react';

/**
 * Blueprint registration marks — four corner brackets around a surface.
 * Purely decorative, hidden from assistive tech.
 */
export function CornerBrackets({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'size-4' : 'size-6';

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-2 z-20">
      <span className={`absolute top-0 left-0 ${dim} border-t border-l border-marker`} />
      <span className={`absolute top-0 right-0 ${dim} border-t border-r border-marker`} />
      <span className={`absolute bottom-0 left-0 ${dim} border-b border-l border-marker`} />
      <span className={`absolute right-0 bottom-0 ${dim} border-r border-b border-marker`} />
    </div>
  );
}

/** Uppercase tracked eyebrow — the "editorial" voice of the system. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-label font-medium tracking-[0.24em] text-muted uppercase">{children}</p>;
}

/** Hairline rule with a centre diamond marker. */
export function Rule({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-px w-full bg-hairline ${className}`}>
      <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-marker bg-surface" />
    </div>
  );
}
