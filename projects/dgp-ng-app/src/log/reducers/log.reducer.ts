import { ActionReducerMap } from "@ngrx/store";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { createEntityReducer } from "entity-store";
import { LogState, logStoreFeature } from "../models/log-state.model";
import { logEntryType } from "../models/log-entry.model";

export const logStoreReducerImpl: ActionReducerMap<LogState> = {

    logEntries: createEntityReducer({
        entityType: logEntryType,
        storeFeature: logStoreFeature
    })

};

export const logStoreReducer = new InjectionToken<LogState>("LogStoreReducer");

export function logStoreReducerFactory(): ActionReducerMap<LogState> {
    return logStoreReducerImpl;
}

export const logStoreReducerProviders = [{
    provide: logStoreReducer,
    useFactory: logStoreReducerFactory
} as FactoryProvider];
