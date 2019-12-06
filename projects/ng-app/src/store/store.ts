import { ActionReducerMap } from "@ngrx/store";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { hmrReducer } from "dgp-ng-app";

export interface AppState {
}

export const _appReducer: ActionReducerMap<AppState> = {};

export const appReducer = new InjectionToken<ActionReducerMap<AppState>>("appReducer");

export function appReducerFactory(): ActionReducerMap<AppState> {
    return _appReducer;
}

export const appReducerProviders = [{
    provide: appReducer,
    useFactory: appReducerFactory
} as FactoryProvider];


export const appMetaReducers = [
    hmrReducer
];
