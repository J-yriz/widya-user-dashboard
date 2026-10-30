import type { User } from '../../types/user';
import { cx } from '../../utils/cx';
import { IconArrowUpRight } from '../ui/Icons';

interface UserTableProps {
  readonly users: readonly User[];
  readonly onSelect: (user: User) => void;
}

/** Columns collapse progressively so the table never needs horizontal scroll. */
const COLUMNS: ReadonlyArray<{ label: string; hide?: string }> = [
  { label: 'Nama' },
  { label: 'Username', hide: 'hidden sm:table-cell' },
  { label: 'Email' },
  { label: 'Kota', hide: 'hidden md:table-cell' },
  { label: 'Perusahaan', hide: 'hidden lg:table-cell' },
];

export function UserTable({ users, onSelect }: UserTableProps) {
  return (
    <div className="relative overflow-x-auto border border-hairline">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Daftar pengguna. Pilih baris untuk melihat detail lengkap.
        </caption>

        <thead>
          <tr className="border-b border-hairline bg-ink-700/[0.03]">
            {COLUMNS.map((column) => (
              <th
                key={column.label}
                scope="col"
                className={cx(
                  'px-4 py-3 text-micro font-medium tracking-[0.2em] text-muted uppercase',
                  column.hide ?? '',
                )}
              >
                {column.label}
              </th>
            ))}
            <th scope="col" className="w-10 px-4 py-3">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              tabIndex={0}
              onClick={() => onSelect(user)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(user);
                }
              }}
              className="group cursor-pointer border-b border-hairline transition-colors duration-(--dur-fast) last:border-b-0 hover:bg-lilac/25 focus-visible:bg-lilac/25 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orchid"
            >
              <td className="px-4 py-3.5">
                <span className="text-sm font-medium text-ink-900">{user.name}</span>
              </td>
              <td className="hidden px-4 py-3.5 text-sm text-muted sm:table-cell">@{user.username}</td>
              <td className="px-4 py-3.5 text-sm text-muted">{user.email}</td>
              <td className="hidden px-4 py-3.5 text-sm text-muted md:table-cell">{user.address.city}</td>
              <td className="hidden px-4 py-3.5 text-sm text-muted lg:table-cell">{user.company.name}</td>
              <td className="px-4 py-3.5">
                <IconArrowUpRight
                  size={15}
                  className="text-muted transition-colors duration-(--dur-fast) group-hover:text-ink-900"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
