import { RxComponentFixture } from "../models/rx-component-fixture.model";

export function createRxComponentFixture<T extends object>(instance: T) {
    return new RxComponentFixture<T>();
}
