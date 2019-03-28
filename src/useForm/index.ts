import { useState, FormEvent } from 'react';

type Method = 'POST' | 'PATCH' | 'UPDATE';

type Data = { [key: string]: string };

interface UseFormOptions {
  endpoint: string;
  method?: Method;
  defaultFields?: { [key: string]: string };
  headers?: Data;
}

interface UseFormInterface<T> {
  submit: (e: FormEvent<HTMLFormElement>) => Promise<any>;
  getField: (name: string) => string;
  setField: (key: string, value: string) => void;
  submitting: boolean;
  error: any;
  response: T;
}

export default function useForm<T>(opts: UseFormOptions): UseFormInterface<T> {
  /**
   * TODO:
   * Put this into a state reducer instead
   * for more syncronous control.
   */

  const [formFields, setFormFields] = useState(opts.defaultFields || {});
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

      const res = await fetch(opts.endpoint, {
        method: opts.method || 'POST',
        headers: { ...opts.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(preparedData)
      });

      setResponse(res);
      setSubmitting(false);
      setError(null);
    } catch (error) {
      setSubmitting(false);
      setError(error);
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

export { UseFormOptions, UseFormInterface };
