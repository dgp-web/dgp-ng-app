import { RxAttribute } from "../models/rx-attribute.model";

export function createRxAttribute<TTarget extends object, TAttributeKey extends keyof TTarget>(attributeKey: TAttributeKey) {
    return new RxAttribute<TTarget, TAttributeKey>(null);
}
