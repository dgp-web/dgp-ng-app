import { Action } from "@ngrx/store";
import { Observable } from "rxjs";

export const scheduleRequestActionType = "[ScheduleRequest] ScheduleRequestAction";

export interface ScheduleRequestActionPayload<T> {
    /**
     * The request to be processed.
     *
     * Observables are converted into promises
     */
    request$: Promise<T> | Observable<T>;
}

export class ScheduleRequestAction<T> implements Action {
    readonly type = scheduleRequestActionType;

    constructor(public readonly payload: ScheduleRequestActionPayload<T>) {
    }
}


export const registerRequestActionType = "[Request] Register";

export class RegisterRequestAction implements Action {
    readonly type = registerRequestActionType;
}

export const unregisterRequestActionType = "[Request] Unregister";

export class UnregisterRequestAction implements Action {
    readonly type = unregisterRequestActionType;
}

export const resetRequestsActionType = "[Request] Reset";

export class ResetRequestAction implements Action {
    readonly type = resetRequestsActionType;
}

export type RequestBookkeepingActions = RegisterRequestAction | UnregisterRequestAction | ResetRequestAction;
