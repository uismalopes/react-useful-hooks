import type { UseEventListenerElement } from './UseEventListenerElement';

export type UseEventListenerEventType<
  E extends UseEventListenerElement,
  CustomEvents extends Record<string, Event> = {},
> = E extends Window
  ? WindowEventMap & CustomEvents
  : E extends Document
    ? DocumentEventMap & CustomEvents
    : E extends HTMLElement
      ? HTMLElementEventMap & CustomEvents
      : CustomEvents;
