import { useReducer, useEffect } from 'react';
import fetchReducer, { actionTypes } from './reducer';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type Mode = 'no-cors' | 'cors' | 'same-origin';
type Cache =
  | 'default'
  | 'no-cache'
  | 'reload'
  | 'force-cache'
  | 'only-if-cached';
type Credentials = 'same-origin' | 'include' | 'omit';
type Redirect = 'follow' | 'manual' | 'error';
type Referrer = 'client' | 'no-referrer';
type Headers = { [key: string]: string };

export interface UseFetchOptions {
  endpoint: string;
  method?: Method;
  initialData: any;
  fetchOnMount: boolean;
  headers?: Headers;
  asJSON?: boolean;
  mode?: Mode;
  cache?: Cache;
  credentials?: Credentials;
  redirect?: Redirect;
  referrer?: Referrer;
  body?: any;
}

export interface UseFetchInterface<T> {
  fetching: boolean;
  response: T;
  error: any;
  refetch: () => Promise<any>;
}

export default function useFetch<T>(
  opts: UseFetchOptions
): UseFetchInterface<T> {
  const [state, dispatch] = useReducer(fetchReducer, {
    fetching: false,
    response: opts.initialData,
    error: null
  });

  if ((opts.body && !opts.method) || (opts.body && opts.method === 'GET')) {
    throw new Error(
      `Looks like you are trying to post data with a "GET"-request. 
      Change the method to "POST".`
    );
  }

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
