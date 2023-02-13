import { Callback } from "./callback.model";

export interface CallbackHandle {
    // tslint:disable-next-line:ban-types
    readonly callback: Callback;
    readonly context?: any;
}
