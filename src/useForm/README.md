# useForm

Hook for handling form submissions easier.

## Usage

```jsx
import { useForm } from '@oyvindher/hooks';

function MyForm() {
  const { submit, setField, getField, submitting } = useForm({
    endpoint: '/api/login',
    method: 'POST',
    headers: {},
    onSuccess: response => {},
    onError: error => {},
    fields: {
      username: '',
      password: ''
    }
  });

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={getField('username')}
        onChange={e => setField('username', e.target.value)}
      />
      <input
        type="password"
        value={getField('password')}
        onChange={e => setField('password', e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```
