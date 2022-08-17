import { FC, useState } from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import { useDebouncedValue } from './use-debounced-value';

const TestComponent: FC<{ initialValue?: number }> = ({ initialValue = 0 }) => {
  const [value, setValue] = useState<number>(initialValue);
  const debouncedValue = useDebouncedValue<number>(value, 3);

  return (
    <div>
      <button data-testid={'increment'} onClick={() => setValue((prev) => prev + 1)} />
      <div data-testid={'debouncedValue'}>{debouncedValue}</div>
      <div data-testid={'value'}>{value}</div>
    </div>
  );
};

describe('useDebouncedValue Hook', function () {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce and only change value when delay time has passed', function () {
    jest.useFakeTimers();
    const { getByTestId } = render(<TestComponent />);
    const incrementButton = getByTestId('increment');
    const debouncedValue = getByTestId('debouncedValue');
    const value = getByTestId('value');

    const incrementAndPassTime = (passedTime: number) => {
      act(() => {
        fireEvent.click(incrementButton);
        jest.advanceTimersByTime(passedTime);
      });
    };

    incrementAndPassTime(1);

    expect(debouncedValue.textContent).toEqual('0');
    expect(value.textContent).toEqual('1');

    incrementAndPassTime(1);

    expect(debouncedValue.textContent).toEqual('0');
    expect(value.textContent).toEqual('2');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(debouncedValue.textContent).toEqual('2');
    expect(value.textContent).toEqual('2');
  });
});

describe('Initial Value of DebouncedValue', function () {
  it('should set initial value', function () {
    const { getByTestId } = render(<TestComponent initialValue={1} />);
    expect(getByTestId('debouncedValue').textContent).toEqual('1');
    expect(getByTestId('value').textContent).toEqual('1');
  });
});
