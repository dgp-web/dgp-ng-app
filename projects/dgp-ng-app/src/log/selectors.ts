import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getAll } from "entity-store";
import { LogState, logStoreFeature } from "./models";
import { logStore } from "./reducers";

export const logFeatureSelector = createFeatureSelector<LogState>(logStoreFeature);

export const getLogEntryState = createSelector(
    logFeatureSelector,
    x => x.logEntry
);

export const getAllLogEntries = createSelector(
    getLogEntryState, x => {
        const entries = getAll(x);
        entries.sort((a, b) => {
            return b.timeStamp - a.timeStamp;
        });
        return entries;
    });

export const hasLogEntries = createSelector(
    getAllLogEntries, x => x && x.length > 0
);

export const getSelectedLogEntry = createSelector(
    logFeatureSelector, logStore.selectors.logEntry.getFirstSelected
);
