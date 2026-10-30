import type { User } from '../types/user';

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!configuredBaseUrl) {
  throw new Error('VITE_API_BASE_URL belum diset. Salin .env.example menjadi .env.');
}

/** Trailing slash dropped so `${BASE_URL}/users` never doubles up. */
const BASE_URL = configuredBaseUrl.replace(/\/+$/, '');

/** Thrown for non-2xx responses so callers can branch on `instanceof`. */
export class ApiError extends Error {
  readonly status: number | undefined;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Minimal typed fetch wrapper.
 * - AbortSignal is forwarded so the caller can cancel in-flight work.
 * - Abort rejections are re-thrown untouched (caller distinguishes them).
 */
async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...(signal ? { signal } : {}),
      headers: { Accept: 'application/json' },
    });
  } catch (err: unknown) {
    // Abort is a control-flow signal, not a failure — let the caller see it.
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    throw new ApiError(
      'Tidak dapat menghubungi server. Periksa koneksi Anda, lalu coba lagi.',
    );
  }

  if (!res.ok) {
    const detail =
      res.status === 429
        ? 'Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.'
        : `Server menolak permintaan (HTTP ${res.status}). Coba lagi beberapa saat lagi.`;
    throw new ApiError(detail, res.status);
  }

  return (await res.json()) as T;
}

export function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  return request<User[]>('/users', signal);
}
