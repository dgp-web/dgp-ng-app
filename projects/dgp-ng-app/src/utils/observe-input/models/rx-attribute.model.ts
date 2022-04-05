import { BehaviorSubject } from "rxjs";

export class RxAttribute<TTarget extends object, TAttributeKey extends keyof TTarget> extends BehaviorSubject<TTarget[TAttributeKey]> {
}
