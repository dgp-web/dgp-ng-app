import { Action } from "@ngrx/store";
import { LogEntry } from "../models/log-entry.model";

export const logErrorActionType = "[Log] LogError";

export class LogErrorAction implements Action {
    readonly type = logErrorActionType;

    constructor(public readonly payload: {
        readonly title: string;
        readonly error?: any;
    }) {
    }
}

export const addLogEntryActionType = "[Log] AddLogEntry";

export class AddLogEntryAction implements Action {
    readonly type = addLogEntryActionType;

    constructor(public readonly logEntry: LogEntry) {
    }
}

