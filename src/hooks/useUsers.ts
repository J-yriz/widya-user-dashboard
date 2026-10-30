import { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';
import type { AsyncState, User } from '../types/user';

/**
 * Owns the users resource lifecycle.
 *
 * Effect keyed on `attempt` only — `attempt` changes exclusively via `retry()`,
 * so the effect cannot re-trigger itself (no infinite loop).
 * The cleanup aborts the in-flight request on unmount / re-run, which
 * prevents setState-after-unmount and cross-attempt race conditions.
 */
export function useUsers() {
  const [state, setState] = useState<AsyncState<User[]>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetchUsers(controller.signal)
      .then((data) => {
        if (active) setState({ status: 'success', data });
      })
      .catch((err: unknown) => {
        if (!active || controller.signal.aborted) return;
        setState({
          status: 'error',
          message: err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga',
        });
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt]);

  /** Event-driven reset: loading state is set here, never inside the effect. */
  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((n) => n + 1);
  }, []);

  return { state, retry };
}
