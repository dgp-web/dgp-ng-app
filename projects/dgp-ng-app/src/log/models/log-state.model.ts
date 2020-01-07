import { EntityState } from "entity-store";
import { LogEntry } from "./log-entry.model";

export interface LogState {
    readonly logEntries: EntityState<LogEntry>;
}

export const logStoreFeature = "LogStore";
