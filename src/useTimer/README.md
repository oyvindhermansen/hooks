# useTimer

Hook for setting a timeout with custom delay.

Usage:

```jsx
import { useTimer } from '@oyvindher/hooks';

function App() {
  const [timer, setTimer] = useTimer();

  setTimer(2000);

  // timer variable is now true until timer has expired

  return <div>{JSON.stringify(timer)}</div>;
}
```
