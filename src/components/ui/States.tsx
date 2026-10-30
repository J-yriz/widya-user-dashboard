import { IconAlert, IconRetry } from './Icons';

interface ErrorStateProps {
  readonly message: string;
  readonly onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="relative border border-hairline bg-surface p-8 text-center shadow-flat sm:p-12"
    >
      <span className="mx-auto grid size-11 place-items-center border border-marker text-ink-900">
        <IconAlert size={20} />
      </span>

      <h3 className="mt-5 text-h3 font-medium text-ink-900">Gagal memuat data</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 bg-ink-900 px-5 py-2.5 text-sm font-medium text-surface transition-transform duration-(--dur-fast) hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
      >
        <IconRetry size={16} />
        Coba lagi
      </button>
    </div>
  );
}

export function EmptyState({ query }: { readonly query: string }) {
  return (
    <div className="relative border border-dashed border-marker bg-surface/50 p-8 text-center sm:p-12">
      <p className="text-label font-medium tracking-[0.24em] text-muted uppercase">Nihil</p>
      <h3 className="mt-4 text-h3 font-medium text-ink-900">Tidak ada spesimen cocok</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted">
        Tidak ditemukan pengguna dengan kata kunci{' '}
        <span className="font-medium text-ink-900">“{query}”</span>. Coba nama atau email lain.
      </p>
    </div>
  );
}
