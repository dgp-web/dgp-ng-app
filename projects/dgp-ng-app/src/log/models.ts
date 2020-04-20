import { EntityStateMap } from "entity-store";

export enum Severity {
    Error
}

export interface LogEntry {
    readonly timeStamp: Date;
    readonly title: string;
    readonly content?: any;
    readonly severity: Severity;
}

export interface LogStoreSchema {
    readonly logEntry: LogEntry;
}

export interface LogState extends EntityStateMap<LogStoreSchema> {
}

export type LogStoreFeature = "LogStore";
export const logStoreFeature: LogStoreFeature = "LogStore";
