import type { User } from '../types/user';

/**
 * Case-insensitive match on name or email.
 * `needle` is expected to be pre-normalised (trimmed + lowercased),
 * so the predicate stays O(1) per row during filtering.
 */
export function matchesQuery(user: User, needle: string): boolean {
  if (needle.length === 0) return true;
  return user.name.toLowerCase().includes(needle) || user.email.toLowerCase().includes(needle);
}

export function filterUsers(users: readonly User[], query: string): readonly User[] {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) return users;
  return users.filter((user) => matchesQuery(user, needle));
}
