import { BehaviorSubject } from "rxjs";

export class RxComponentFixture<T extends object> extends Map<keyof T, BehaviorSubject<T[keyof T]>> {
}
