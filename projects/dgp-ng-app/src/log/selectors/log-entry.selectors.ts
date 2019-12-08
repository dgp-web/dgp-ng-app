import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LogState, logStoreFeature} from "../models";
import {getAll, getFirstSelected} from "entity-store";

export const logFeatureSelector = createFeatureSelector<LogState>(logStoreFeature);

export const getLogEntryStateSelector = createSelector(
    logFeatureSelector,
    x => x.logEntries
);

export const getAllLogEntriesSelector = createSelector(
    getLogEntryStateSelector, x => {
        const entries = getAll(x);
        entries.sort((a, b) => {
            return b.timeStamp.getTime() - a.timeStamp.getTime();
        });
        return entries;
    });


export const getSelectedLogEntrySelector = createSelector(
    getLogEntryStateSelector, getFirstSelected
);
