import { isEqual } from "lodash";
import { getOrCreateRxAttribute$ } from "./functions/get-or-create-rx-attribute$.function";

export function observeInput$<TTarget extends object, TAttributeKey extends keyof TTarget>(
    target: TTarget, attributeKey: TAttributeKey
) {

    delete target[attributeKey];

    const attribute$ = getOrCreateRxAttribute$(target, attributeKey);

    Object.defineProperty(target, attributeKey, {
        set(value) {
            if (isEqual(value, attribute$.value)) return;
            attribute$.next(value);
        },
        get() {
            return attribute$.value;
        },
    });

    return attribute$.asObservable();

}

