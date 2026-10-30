import type { ReactNode } from 'react';

/** Page shell: canvas + dot-grid, consistent 16px vertical rhythm. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="blueprint-grid flex min-h-dvh flex-col bg-canvas">
      <a href="#main" className="skip-link">
        Lompat ke konten utama
      </a>
      <main id="main" className="mx-auto w-full max-w-(--container-max) flex-1 px-4 py-4 sm:px-8">
        {children}
      </main>
    </div>
  );
}
