import { Action, createAction, props } from "@ngrx/store";
import { LogEntry } from "./models";

export interface LogErrorPayload {
    readonly title: string;
    readonly error?: any;
}

export const logError = createAction("[Log] LogError", props<{
    readonly payload: LogErrorPayload;
}>());

export const addLogEntry = createAction("[Log] AddLogEntry", props<{ readonly logEntry: LogEntry }>());

export const logErrorActionType = logError.type;

export class LogErrorAction implements Action {
    readonly type = logErrorActionType;

    constructor(public readonly payload: LogErrorPayload) {
    }
}
