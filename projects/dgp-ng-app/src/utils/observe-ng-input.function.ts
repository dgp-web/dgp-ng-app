import { BehaviorSubject } from "rxjs";
import { isEqual } from "lodash";

export function observeInput$<TTarget extends object, TAttributeKey extends keyof TTarget>(
    target: TTarget, attributeKey: TAttributeKey
) {

    delete target[attributeKey];

    const attribute$ = getOrCreateRxAttributeFixture(target, attributeKey);

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

export class RxComponentFixture<T extends object> extends Map<keyof T, BehaviorSubject<T[keyof T]>> {
}

export class RxComponentFixtureMap<T extends object> extends WeakMap<T, RxComponentFixture<T>> {
}

export const rxComponentFixtureMap = new RxComponentFixtureMap<any>();

export function registerRxComponentFixture<T extends object>(
    instance: T, fixture: RxComponentFixture<T>
) {
    rxComponentFixtureMap.set(instance, fixture);
}

export function createRxComponentFixture<T extends object>(instance: T) {
    return new RxComponentFixture<T>();
}

export function getOrCreateRxComponentFixture<T extends object>(instance: T) {
    let fixture = rxComponentFixtureMap.get(instance) as RxComponentFixture<T>;
    if (fixture === undefined) {
        fixture = createRxComponentFixture(instance);
        registerRxComponentFixture(instance, fixture);
    }
    return fixture;
}

export function registerRxAttribute<T extends object>(
    attributeKey: keyof T,
    attribute$: BehaviorSubject<T[typeof attributeKey]>,
    fixture: RxComponentFixture<T>
) {
    fixture.set(attributeKey, attribute$);
}

export function createRxAttribute<TTarget extends object, TAttributeKey extends keyof TTarget>(attributeKey: TAttributeKey) {
    return new BehaviorSubject<TTarget[TAttributeKey]>(null);
}

export function getOrCreateRxAttributeFixture<TTarget extends object, TAttributeKey extends keyof TTarget>(
    instance: TTarget, attributeKey: TAttributeKey
) {
    const componentFixture = getOrCreateRxComponentFixture(instance);

    let attribute$ = componentFixture.get(attributeKey) as BehaviorSubject<TTarget[TAttributeKey]>;

    if (attribute$ === undefined) {
        attribute$ = createRxAttribute(attributeKey);
        registerRxAttribute(attributeKey, attribute$, componentFixture);
    }

    return attribute$;
}
