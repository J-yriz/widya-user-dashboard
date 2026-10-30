interface SkeletonListProps {
  readonly view: 'table' | 'grid';
  readonly rows?: number;
}

/** Blueprint-style skeleton: hairline blocks + shimmer, no spinners. */
export function SkeletonList({ view, rows = 8 }: SkeletonListProps) {
  const count = view === 'table' ? rows : 6;

  return (
    <div aria-busy="true" aria-live="polite" className="animate-fade-in">
      <span className="sr-only">Memuat daftar pengguna…</span>

      {view === 'table' ? (
        <div className="border border-hairline">
          <div className="flex gap-4 border-b border-hairline bg-ink-700/[0.03] px-4 py-3">
            {[24, 16, 26, 14, 20].map((w, i) => (
              <div key={i} className="skeleton h-2.5" style={{ width: `${w}%` }} />
            ))}
          </div>
          {Array.from({ length: count }, (_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-hairline px-4 py-4 last:border-b-0">
              <div className="skeleton size-9 shrink-0" />
              <div className="skeleton h-3 flex-1" />
              <div className="skeleton hidden h-3 w-1/5 sm:block" />
              <div className="skeleton hidden h-3 w-1/6 md:block" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: count }, (_, i) => (
            <div key={i} className="border border-hairline p-5">
              <div className="flex items-center gap-3">
                <div className="skeleton size-10 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3 w-3/4" />
                  <div className="skeleton h-2.5 w-1/2" />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="skeleton h-2.5 w-full" />
                <div className="skeleton h-2.5 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
