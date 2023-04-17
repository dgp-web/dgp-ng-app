import { EventListenerOptions } from "rxjs/internal/observable/fromEvent";

export function createPassiveEventListenerOptions(payload: EventListenerOptions = {}): EventListenerOptions {
    return {
        ...payload,
        passive: true
    };
}
