import { useReducer, useEffect } from 'react';
import fetchReducer, { actionTypes } from './reducer';

export interface UseFetchOptions extends Partial<Request> {
  endpoint: string;
  initialData: any;
  fetchOnMount: boolean;
  asJSON?: boolean;
}

export interface UseFetchInterface<T> {
  fetching: boolean;
  response: T;
  error: any;
  refetch: () => Promise<any>;
}

export function useFetch<T>(opts: UseFetchOptions): UseFetchInterface<T> {
  const [state, dispatch] = useReducer(fetchReducer, {
    fetching: false,
    response: opts.initialData,
    error: null
  });

  async function fetchData() {
    try {
      dispatch({ type: actionTypes.fetching });

      const res: unknown = await fetch(opts.endpoint, {
        headers: { ...opts.headers },
        method: opts.method || 'GET',
        mode: opts.mode || 'cors',
        cache: opts.cache || 'default',
        credentials: opts.credentials || 'same-origin',
        redirect: opts.redirect || 'follow',
        referrer: opts.referrer || 'client'
      });

      const finishedResponse = res as Response;
      const response = opts.asJSON
        ? await finishedResponse.json()
        : finishedResponse;

      dispatch({ type: actionTypes.receiveResponse, response });
    } catch (error) {
      dispatch({ type: actionTypes.error, error });
    }
  }

  useEffect(() => {
    if (opts.fetchOnMount) {
      fetchData();
    }
  }, []);

  return {
    fetching: state.fetching,
    response: state.response as T,
    error: state.error,
    refetch: fetchData
  };
}
