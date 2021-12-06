import { BehaviorSubject, Observable } from "rxjs";
import { isEqual } from "lodash";

/**
 * Creates an Observable for a given property by adding a getter and a setter for it
 * and intercepting its update logic
 *
 * source: https://craftsmen.nl/angular-lifehack-reactive-component-input-properties/
 */
export function observeProperty<T, K extends keyof T>(
    target: T, key: K
): Observable<T[K]> {

    const subject = new BehaviorSubject<T[K]>(target[key]);

    Object.defineProperty(target, key, {
        get(): T[K] {
            return subject.getValue();
        },
        set(newValue: T[K]): void {
            if (!isEqual(newValue, subject.getValue())) {
                subject.next(newValue);
            }
        }
    });

    return subject.asObservable();
}

