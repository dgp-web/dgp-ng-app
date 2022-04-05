import { getOrCreateRxComponentFixture } from "./get-or-create-rx-component-fixture.function";
import { BehaviorSubject } from "rxjs";
import { createRxAttribute } from "./create-rx-attribute.function";
import { registerRxAttribute } from "./register-rx-attribute.function";

export function getOrCreateRxAttribute$<TTarget extends object, TAttributeKey extends keyof TTarget>(
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
