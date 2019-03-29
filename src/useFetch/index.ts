import { useReducer, useEffect } from 'react';
import fetchReducer, { actionTypes } from './reducer';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IOpts {
  endpoint: string;
  method?: Method;
  initialData: any;
  fetchOnMount: boolean;
  headers?: any;
  asJSON?: boolean;
}

interface UseFetchInterface<T> {
  fetching: boolean;
  response: T;
  error: any;
  refetch: () => Promise<any>;
}

export default function useFetch<T>(opts: IOpts): UseFetchInterface<T> {
  const [state, dispatch] = useReducer(fetchReducer, {
    fetching: false,
    response: opts.initialData,
    error: null
  });

  async function fetchData() {
    try {
      dispatch({ type: actionTypes.fetching });

      const res: unknown = await fetch(opts.endpoint, {
        method: opts.method || 'GET',
        headers: opts.headers
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
    response: state.response,
    error: state.error,
    refetch: fetchData
  };
}
