import * as React from 'react';
import { render, fireEvent, cleanup, act } from 'react-testing-library';
import useSafeState from '../../src/useSafeState';

function EffectfulComponent() {
  const [state, setState] = useSafeState(0);

  function handleClick(_: React.MouseEvent<HTMLButtonElement>) {
    setState(prevState => prevState + 1);
  }

  return <button onClick={handleClick}>{state}</button>;
}

describe('useSafeState', () => {
  afterEach(cleanup);

  it('should set state as normal useState would', () => {
    const { container } = render(<EffectfulComponent />);
    const button = container.firstChild;

    // Force React's useEffect hook to run synchronously.
    act(() => {
      // Should be default 0
      expect(button.textContent).toBe('0');
    });

    // Fire the set state event
    // @ts-ignore
    fireEvent.click(button);

    act(() => {
      expect(button.textContent).toBe('1');
    });
  });
});
