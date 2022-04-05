import { rxComponentFixtureMap } from "../constants/rx-component-fixture-map.constant";
import { RxComponentFixture } from "../models/rx-component-fixture.model";
import { createRxComponentFixture } from "./create-rx-component-fixture.function";
import { registerRxComponentFixture } from "./register-rx-component-fixture.function";

export function getOrCreateRxComponentFixture<T extends object>(instance: T) {
    let fixture = rxComponentFixtureMap.get(instance) as RxComponentFixture<T>;
    if (fixture === undefined) {
        fixture = createRxComponentFixture(instance);
        registerRxComponentFixture(instance, fixture);
    }
    return fixture;
}
