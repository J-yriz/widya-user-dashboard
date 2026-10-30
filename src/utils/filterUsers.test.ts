import { describe, expect, it } from 'vitest';
import { filterUsers } from './filterUsers';
import type { User } from '../types/user';

function makeUser(id: number, name: string, email: string): User {
  return {
    id,
    name,
    username: `user${id}`,
    email,
    phone: '000',
    website: 'example.test',
    address: { street: 'St', suite: 'Apt', city: 'City', zipcode: '00000', geo: { lat: '0', lng: '0' } },
    company: { name: 'Co', catchPhrase: 'Phrase', bs: 'bs' },
  };
}

const USERS: readonly User[] = [
  makeUser(1, 'Leanne Graham', 'Sincere@april.biz'),
  makeUser(2, 'Ervin Howell', 'Shanna@melissa.tv'),
  makeUser(3, 'Patricia Lebsack', 'Julianne.OConner@kory.org'),
];

describe('filterUsers', () => {
  it('returns every user for an empty or whitespace query', () => {
    expect(filterUsers(USERS, '')).toHaveLength(3);
    expect(filterUsers(USERS, '   ')).toHaveLength(3);
  });

  it('matches by name, case-insensitively', () => {
    expect(filterUsers(USERS, 'LEANNE').map((u) => u.id)).toEqual([1]);
  });

  it('matches by email, case-insensitively', () => {
    expect(filterUsers(USERS, 'melissa.tv').map((u) => u.id)).toEqual([2]);
  });

  it('ignores surrounding whitespace', () => {
    expect(filterUsers(USERS, '  graham  ').map((u) => u.id)).toEqual([1]);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterUsers(USERS, 'zzzz')).toHaveLength(0);
  });
});
