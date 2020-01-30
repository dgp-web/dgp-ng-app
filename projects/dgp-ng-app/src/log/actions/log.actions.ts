import { createAction, props } from "@ngrx/store";
import { LogEntry } from "../models/log.models";

export const logError = createAction("[Log] LogError", props<{
    readonly payload: {
        readonly title: string;
        readonly error?: any;
    }
}>());

export const addLogEntry = createAction("[Log] AddLogEntry", props<{ readonly logEntry: LogEntry }>());
