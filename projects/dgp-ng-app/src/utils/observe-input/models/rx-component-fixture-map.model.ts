import { RxComponentFixture } from "./rx-component-fixture.model";

export class RxComponentFixtureMap<T extends object> extends WeakMap<T, RxComponentFixture<T>> {
}
