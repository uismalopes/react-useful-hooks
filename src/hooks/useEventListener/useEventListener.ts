import { useEffect } from 'react';
import type { DependencyList } from 'react';
import type { UseEventListenerElement, UseEventListenerInput } from './types';

function useEventListener<E extends UseEventListenerElement, CustomEvents extends Record<string, Event> = {}>(
  input: UseEventListenerInput<E, CustomEvents>,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const items = Array.isArray(input) ? input : [input];

    const listeners: Array<{
      target: E;
      type: string;
      callback: EventListener;
    }> = [];

    for (const item of items) {
      const { ref, target, type, callback } = item;
      const cb = callback as EventListener;

      const currentTargets: E[] = [];

      if (ref) {
        const refs = Array.isArray(ref) ? ref : [ref];
        refs.forEach((_ref) => {
          if (_ref.current) currentTargets.push(_ref.current);
        });
      }

      if (target) {
        const _targets = Array.isArray(target) ? target : [target];
        currentTargets.push(..._targets);
      }

      for (const t of currentTargets) {
        t.addEventListener(type as string, cb);
        listeners.push({ target: t, type: type as string, callback: cb });
      }
    }

    return () => {
      for (const { target, type, callback } of listeners) {
        target.removeEventListener(type, callback);
      }
    };
  }, [input, ...deps]);
}

export default useEventListener;
