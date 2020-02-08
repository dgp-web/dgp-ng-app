import { ActionReducerMap } from "@ngrx/store";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { hmrReducer } from "dgp-ng-app";
import { createEntityStore, EntityStateMap } from "entity-store";

export interface User {
    readonly userId: string;
    readonly firstName: string;
    readonly lastName: string;
}

export interface AppEntities {
    readonly user: User;
}

export interface AppState extends EntityStateMap<AppEntities> {
}

export const appEntityStore = createEntityStore<AppEntities>({
    entityTypes: ["user"]
});

export const appReducer = new InjectionToken<typeof appEntityStore.reducers>("appReducer");

export function appReducerFactory() {
    return appEntityStore.reducers;
}

export const appReducerProviders = [{
    provide: appReducer,
    useFactory: appReducerFactory
} as FactoryProvider];


export const appMetaReducers = [
    hmrReducer
];
