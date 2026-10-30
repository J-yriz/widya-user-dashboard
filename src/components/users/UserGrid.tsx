import type { User } from '../../types/user';
import { CornerBrackets } from '../ui/Blueprint';
import { IconArrowUpRight, IconBuilding, IconMail, IconPin } from '../ui/Icons';

interface UserGridProps {
  readonly users: readonly User[];
  readonly onSelect: (user: User) => void;
}

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}

export function UserGrid({ users, onSelect }: UserGridProps) {
  return (
    <ul className="grid list-none gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {users.map((user) => (
        <li key={user.id}>
          <article className="h-full">
            <button
              type="button"
              onClick={() => onSelect(user)}
              aria-label={`Lihat detail ${user.name}`}
              className="group relative flex h-full w-full flex-col border border-hairline bg-surface p-5 text-left shadow-flat transition-all duration-(--dur-base) ease-(--ease-brand) hover:-translate-y-0.5 hover:border-marker hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
            >
              <CornerBrackets size="sm" />

              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center border border-marker bg-ink-900 text-xs font-medium tracking-wide text-surface">
                  {initials(user.name)}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-medium text-ink-900">{user.name}</h3>
                  <p className="mt-0.5 truncate text-xs text-muted">@{user.username}</p>
                </div>

                <IconArrowUpRight
                  size={15}
                  className="mt-1 shrink-0 text-muted transition-colors duration-(--dur-fast) group-hover:text-ink-900"
                />
              </div>

              <dl className="mt-5 space-y-2.5 border-t border-hairline pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Email</dt>
                  <IconMail size={13} className="shrink-0 text-muted" />
                  <dd className="truncate text-muted">{user.email}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Kota</dt>
                  <IconPin size={13} className="shrink-0 text-muted" />
                  <dd className="truncate text-muted">{user.address.city}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Perusahaan</dt>
                  <IconBuilding size={13} className="shrink-0 text-muted" />
                  <dd className="truncate text-muted">{user.company.name}</dd>
                </div>
              </dl>
            </button>
          </article>
        </li>
      ))}
    </ul>
  );
}
