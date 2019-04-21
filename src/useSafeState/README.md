# useSafeState

Hook for always setting state on mounted components. Prevents memory leaks, that typically happens
when setting state on unmounted components.

## Usage

```jsx
import { useSafeState } from '@oyvindher/hooks';

function App() {
  const [counter, setCounter] = useState(0);

  return <div>{counter}</div>;
}
```
