# useFetch

A handy hook for handling fetch request more easily.

## Usage

```jsx
import { useFetch } from '@oyvindher/hooks';

interface User {
  id: string;
  name: string;
}

function App() {
  const { fetching, response, error } = useFetch<User[]>({
    endpoint: '/my-api-endpoint',
    initialData: [],
    fetchOnMount: true,
    asJSON: true
  });

  return (
    <div>
      {response.map((user: User) => <p>{user.name}</p>)}
    </div>
  )
}
```
