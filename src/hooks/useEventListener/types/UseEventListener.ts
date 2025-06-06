import type { UseEventListenerElement } from './UseEventListenerElement';
import type { UseEventListenerEventType } from './UseEventListenerEventType';

type UseEventListenerElementBase<E extends UseEventListenerElement, CustomEvents extends Record<string, Event> = {}> = {
  type: keyof UseEventListenerEventType<E, CustomEvents>;
  callback: (
    this: E,
    ev: UseEventListenerEventType<E, CustomEvents>[keyof UseEventListenerEventType<E, CustomEvents>],
  ) => void;
};

export type UseEventListener<E extends UseEventListenerElement, CustomEvents extends Record<string, Event> = {}> =
  | ({
      ref: React.RefObject<E | null> | React.RefObject<E | null>[];
      target?: never;
    } & UseEventListenerElementBase<E, CustomEvents>)
  | ({
      target: E | E[];
      ref?: never;
    } & UseEventListenerElementBase<E, CustomEvents>);
