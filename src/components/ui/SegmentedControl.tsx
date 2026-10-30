import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

interface SegmentedControlProps<T extends string> {
  readonly label: string;
  readonly value: T;
  readonly options: ReadonlyArray<{ value: T; label: string; icon: ReactNode }>;
  readonly onChange: (value: T) => void;
}

/** Radio-group styled as a blueprint segment switch. */
export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="flex w-full border border-hairline sm:w-auto">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.label}
            onClick={() => onChange(option.value)}
            className={cx(
              'flex flex-1 items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-(--dur-fast) sm:flex-none',
              'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orchid',
              active ? 'bg-ink-900 text-surface' : 'text-muted hover:bg-ink-700/5 hover:text-ink-900',
            )}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
