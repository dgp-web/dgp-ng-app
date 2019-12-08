import { ActionReducerMap } from "@ngrx/store";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { logEntryType, LogState, logStoreFeature } from "../models";
import { createEntityReducer } from "entity-store";

export const _logStoreReducer: ActionReducerMap<LogState> = {

    logEntries: createEntityReducer({
        entityType: logEntryType,
        storeFeature: logStoreFeature
    })

};

export const logStoreReducer = new InjectionToken<LogState>("LogStoreReducer");

export function logStoreReducerFactory(): ActionReducerMap<LogState> {
    return _logStoreReducer;
}

export const logStoreReducerProviders = [{
    provide: logStoreReducer,
    useFactory: logStoreReducerFactory
} as FactoryProvider];
