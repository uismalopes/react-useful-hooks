import type { UseEventListener } from './UseEventListener';
import type { UseEventListenerElement } from './UseEventListenerElement';

export type UseEventListenerInput<E extends UseEventListenerElement, CustomEvents extends Record<string, Event> = {}> =
  | UseEventListener<E, CustomEvents>
  | UseEventListener<E, CustomEvents>[];
