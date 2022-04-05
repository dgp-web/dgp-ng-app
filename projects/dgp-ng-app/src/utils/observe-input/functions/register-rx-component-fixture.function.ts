import { RxComponentFixture } from "../models/rx-component-fixture.model";
import { rxComponentFixtureMap } from "../constants/rx-component-fixture-map.constant";

export function registerRxComponentFixture<T extends object>(
    instance: T, fixture: RxComponentFixture<T>
) {
    rxComponentFixtureMap.set(instance, fixture);
}
