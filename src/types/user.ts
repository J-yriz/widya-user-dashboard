/** Domain model — mirrors jsonplaceholder `/users` payload. */

export interface Geo {
  readonly lat: string;
  readonly lng: string;
}

export interface Address {
  readonly street: string;
  readonly suite: string;
  readonly city: string;
  readonly zipcode: string;
  readonly geo: Geo;
}

export interface Company {
  readonly name: string;
  readonly catchPhrase: string;
  readonly bs: string;
}

export interface User {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly phone: string;
  readonly website: string;
  readonly address: Address;
  readonly company: Company;
}

/** Async resource state — discriminated union, no impossible states. */
export type AsyncState<T> =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly message: string };

export type ViewMode = 'table' | 'grid';
