import { ActionReducerMap } from "@ngrx/store";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { RequestStoreState } from "../models";
import { requestReducer } from "./request.reducer";

export const _requestStoreReducer: ActionReducerMap<RequestStoreState> = {
    requests: requestReducer

};

export const requestStoreReducer = new InjectionToken<RequestStoreState>("RequestStoreReducer");

export function requestStoreReducerFactory(): ActionReducerMap<RequestStoreState> {
    return _requestStoreReducer;
}

export const requestStoreReducerProviders = [{
    provide: requestStoreReducer,
    useFactory: requestStoreReducerFactory
} as FactoryProvider];
