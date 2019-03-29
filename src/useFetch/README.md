# useFetch

A handy hook for handling fetch request more easily.

## Usage

```jsx
import { useFetch } from '@oyvindher/hooks';

function App() {
  const { fetching, response, error } = useFetch({
    endpoint: '/my-api-endpoint',
    initialData: [],
    fetchOnMount: true,
    asJSON: true
  });

  return <div />;
}
```
