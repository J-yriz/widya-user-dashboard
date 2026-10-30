import { useId, type ReactNode } from 'react';
import { IconClose, IconSearch } from './Icons';

interface SearchFieldProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly resultCount: number;
  readonly totalCount: number;
  readonly trailingContent?: ReactNode;
}

export function SearchField({
  value,
  onChange,
  resultCount,
  totalCount,
  trailingContent,
}: SearchFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-label font-medium tracking-[0.24em] text-muted uppercase">
        Cari spesimen
      </label>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <IconSearch
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          />

          <input
            id={id}
            type="search"
            role="searchbox"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Nama atau email…"
            autoComplete="off"
            aria-describedby={hintId}
            className="w-full border border-hairline bg-surface py-2.5 pr-10 pl-9 text-sm text-ink-900 placeholder:text-muted transition-[border-color] duration-(--dur-fast) hover:border-marker focus-visible:border-ink-900 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-orchid [&::-webkit-search-cancel-button]:hidden"
          />

          {value.length > 0 && (
            <button
              type="button"
              onClick={() => onChange('')}
              aria-label="Bersihkan pencarian"
              className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center text-muted transition-colors duration-(--dur-fast) hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-orchid"
            >
              <IconClose size={14} />
            </button>
          )}
        </div>

        {trailingContent}
      </div>

      <p id={hintId} aria-live="polite" className="mt-2 text-xs text-muted">
        {resultCount} dari {totalCount} spesimen
      </p>
    </div>
  );
}
