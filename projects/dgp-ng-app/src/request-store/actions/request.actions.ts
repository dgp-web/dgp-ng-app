import { Action, createAction, props } from "@ngrx/store";
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

export const scheduleRequest = createAction(
    scheduleRequestActionType,
    props<ScheduleRequestActionPayload<any>>()
);

export const registerRequestActionType = "[Request] Register";

export const registerRequest = createAction(registerRequestActionType);

export const unregisterRequestActionType = "[Request] Unregister";

export const unregisterRequest = createAction(unregisterRequestActionType);

export const resetRequestsActionType = "[Request] Reset";

export const resetRequests = createAction(resetRequestsActionType);
