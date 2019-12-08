import { Observable, Observer, from, empty } from "rxjs";
import { tap, defaultIfEmpty, first, catchError } from "rxjs/operators";

export interface ObserveRequestPayload<T> {
    request$: Promise<T> | Observable<T>;
    observer: Observer<T>;
}

/**
 * Observes a promise or observable based
 * request
 *
 * Allows intercepting value and error events
 * with a custom observer
 */
export function observeRequest<T>(payload: ObserveRequestPayload<T>): Promise<T> {

    const request = payload.request$;

    let obs$: Observable<any>;

    if (request instanceof Promise) {
        obs$ = from(request as Promise<any>);
    } else {
        obs$ = request as Observable<any>;
    }

    let interceptedObs$ = obs$;

    interceptedObs$ = interceptedObs$.pipe(
        tap(payload.observer),
        catchError((err, caught) => {
            return empty();
        }),
        defaultIfEmpty(null)
    );

    return interceptedObs$.pipe(
        first()
    ).toPromise();

}
