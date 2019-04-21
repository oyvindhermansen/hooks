import { useState, FormEvent } from 'react';

type Method = 'POST' | 'PATCH' | 'UPDATE';

type Data = { [key: string]: string };

export interface UseFormOptions<T> {
  endpoint: string;
  method?: Method;
  fields?: { [key: string]: string };
  headers?: Data;
  onSuccess?: (res: T) => void;
  onError?: (err: any) => void;
}

export interface UseFormInterface<T> {
  submit: (e: FormEvent<HTMLFormElement>) => Promise<any>;
  getField: (name: string) => string;
  setField: (key: string, value: string) => void;
  submitting: boolean;
  error: any;
  response: T;
}

export function useForm<T>(opts: UseFormOptions<T>): UseFormInterface<T> {
  const [formFields, setFormFields] = useState(opts.fields || {});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();

    try {
      setSubmitting(true);

      const preparedData: Data = {};

      for (const key in formFields) {
        const value = formFields[key];
        preparedData[key] = value;
      }

      const res: unknown = await fetch(opts.endpoint, {
        method: opts.method || 'POST',
        headers: { ...opts.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(preparedData)
      });

      const finalResponse = res as T;

      setResponse(finalResponse);
      setSubmitting(false);

      if (typeof opts.onSuccess === 'function') {
        opts.onSuccess(finalResponse);
      }
    } catch (error) {
      setSubmitting(false);
      setError(error);

      if (typeof opts.onError === 'function') {
        opts.onError(error);
      }
    }
  }

  function getField(key: string): string {
    return formFields[key];
  }

  function setField(key: string, value: string) {
    const dataToSend = { ...formFields, [key]: value };
    setFormFields(dataToSend);
  }

  return {
    error,
    submitting,
    submit,
    response: response as T,
    getField,
    setField
  };
}
