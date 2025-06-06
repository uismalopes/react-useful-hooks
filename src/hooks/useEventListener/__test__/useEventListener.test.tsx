import React, { useRef } from 'react';
import { render, cleanup } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import useEventListener from '../useEventListener';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function SingleListenerComponent({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEventListener({
    ref,
    type: 'click',
    callback: onClick,
  });

  return (
    <div ref={ref} data-testid="single-div">
      Click me
    </div>
  );
}

function MultipleListenersComponent({ onClick, onMouseEnter }: { onClick: () => void; onMouseEnter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEventListener(
    [
      {
        ref,
        type: 'click',
        callback: onClick,
      },
      {
        ref,
        type: 'mouseenter',
        callback: onMouseEnter,
      },
    ],
    [],
  );

  return (
    <div ref={ref} data-testid="multiple-div">
      Hover or Click me
    </div>
  );
}

function CustomEventListenerComponent({ onCustomEvent }: { onCustomEvent: (e: EventModifierInit) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEventListener(
    {
      ref,
      type: 'mycustomevent',
      callback: onCustomEvent,
    },
    [],
  );

  return (
    <div ref={ref} data-testid="custom-div">
      Custom event target
    </div>
  );
}

describe('useEventListener hook', () => {
  test('works with single input', async () => {
    const handleClick = vi.fn();

    const { getByTestId, unmount } = render(<SingleListenerComponent onClick={handleClick} />);

    const target = getByTestId('single-div');
    target.click();

    expect(handleClick).toHaveBeenCalledTimes(1);

    unmount();

    target.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('works with array of inputs', async () => {
    const handleClick = vi.fn();
    const handleMouseEnter = vi.fn();

    const { getByTestId, unmount } = render(
      <MultipleListenersComponent onClick={handleClick} onMouseEnter={handleMouseEnter} />,
    );

    const target = getByTestId('multiple-div');

    target.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleMouseEnter).not.toHaveBeenCalled();

    target.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    expect(handleMouseEnter).toHaveBeenCalledTimes(1);

    unmount();

    target.click();
    target.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
  });

  test('works with custom event', () => {
    const handleCustom = vi.fn();

    const { getByTestId, unmount } = render(<CustomEventListenerComponent onCustomEvent={handleCustom} />);

    const target = getByTestId('custom-div');

    const event = new CustomEvent('mycustomevent', { detail: { foo: 'bar' } });
    target.dispatchEvent(event);

    expect(handleCustom).toHaveBeenCalledTimes(1);
    expect(handleCustom).toHaveBeenCalledWith(event);

    unmount();

    target.dispatchEvent(event);
    expect(handleCustom).toHaveBeenCalledTimes(1);
  });
});
