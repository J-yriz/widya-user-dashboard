import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Shell } from './components/layout/Shell';
import { Eyebrow } from './components/ui/Blueprint';
import { SkeletonList } from './components/ui/SkeletonList';
import { EmptyState, ErrorState } from './components/ui/States';
import { Toolbar } from './components/users/Toolbar';
import { UserGrid } from './components/users/UserGrid';
import { UserModal } from './components/users/UserModal';
import { UserTable } from './components/users/UserTable';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useUsers } from './hooks/useUsers';
import type { User, ViewMode } from './types/user';
import { filterUsers } from './utils/filterUsers';

const VIEW_OPTIONS: readonly ViewMode[] = ['table', 'grid'];

/** Stable empty reference — keeps derived `useMemo` deps from churning. */
const EMPTY_USERS: readonly User[] = [];

export default function App() {
  const { state, retry } = useUsers();
  const [query, setQuery] = useState('');
  const [view, setView] = useState<ViewMode>('table');
  const [selected, setSelected] = useState<User | null>(null);

  // Two-stage responsiveness: debounce absorbs keystrokes,
  // useDeferredValue lets React interrupt the heavy list re-render.
  const debouncedQuery = useDebouncedValue(query, 220);
  const deferredQuery = useDeferredValue(debouncedQuery);

  const users = useMemo(
    () => (state.status === 'success' ? state.data : EMPTY_USERS),
    [state],
  );

  const filtered = useMemo(() => filterUsers(users, deferredQuery), [users, deferredQuery]);

  const handleViewChange = useCallback((next: ViewMode) => {
    if (VIEW_OPTIONS.includes(next)) setView(next);
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  const isStale = query !== debouncedQuery || debouncedQuery !== deferredQuery;

  return (
    <Shell>
      {/* ── Toolbar ─────────────────────────────────────────── */}
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        view={view}
        onViewChange={handleViewChange}
        resultCount={filtered.length}
        totalCount={users.length}
      />

      {/* ── Results ─────────────────────────────────────────── */}
      <section aria-labelledby="results-title" className="mt-4">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <div>
            <Eyebrow>Indeks</Eyebrow>
            <h1 id="results-title" className="mt-2 text-h3 font-medium tracking-tight text-ink-900">
              {view === 'table' ? 'Tabel spesimen' : 'Grid spesimen'}
            </h1>
          </div>

          {state.status === 'success' && (
            <p className="text-xs text-muted tabular-nums">
              {filtered.length}/{users.length}
            </p>
          )}
        </div>

        <div
          aria-busy={state.status === 'loading' || isStale}
          className={isStale ? 'opacity-60 transition-opacity duration-(--dur-base)' : undefined}
        >
          {state.status === 'loading' && <SkeletonList view={view} />}

          {state.status === 'error' && <ErrorState message={state.message} onRetry={retry} />}

          {state.status === 'success' && filtered.length === 0 && <EmptyState query={debouncedQuery} />}

          {state.status === 'success' &&
            filtered.length > 0 &&
            (view === 'table' ? (
              <UserTable users={filtered} onSelect={setSelected} />
            ) : (
              <UserGrid users={filtered} onSelect={setSelected} />
            ))}
        </div>
      </section>

      {selected && <UserModal user={selected} onClose={closeModal} />}
    </Shell>
  );
}
