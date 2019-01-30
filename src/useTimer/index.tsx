import { useState, useEffect } from 'react';

function useTimer(): [boolean, (delay: number) => void] {
  let timer: number;
  const [busy, setBusy] = useState(false);

  function setTimer(delay: number) {
    setBusy(true);

    timer = window.setTimeout(() => {
      setBusy(false);
    }, delay);
  }

  useEffect(() => {
    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  return [busy, setTimer];
}

export default useTimer;
