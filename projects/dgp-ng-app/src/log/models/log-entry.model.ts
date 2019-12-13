import { Severity } from "./severity.model";

export interface LogEntry {
    readonly timeStamp: Date;
    readonly title: string;
    readonly content?: any;
    readonly severity: Severity;
}

export const logEntryType = "LogEntry";
