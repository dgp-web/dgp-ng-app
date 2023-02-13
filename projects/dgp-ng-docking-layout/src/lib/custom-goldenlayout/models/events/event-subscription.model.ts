import { Callback } from "./callback.model";

export interface EventSubscription {
    // tslint:disable-next-line:ban-types
    readonly callback: Callback;
    readonly context?: any;
}
