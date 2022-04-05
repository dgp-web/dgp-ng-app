import { BehaviorSubject } from "rxjs";
import { RxComponentFixture } from "../models/rx-component-fixture.model";

export function registerRxAttribute<T extends object>(
    attributeKey: keyof T,
    attribute$: BehaviorSubject<T[typeof attributeKey]>,
    fixture: RxComponentFixture<T>
) {
    fixture.set(attributeKey, attribute$);
}
