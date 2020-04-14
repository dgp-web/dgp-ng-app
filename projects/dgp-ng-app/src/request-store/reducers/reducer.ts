import { ActionReducerMap } from "@ngrx/store";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { requestReducer } from "./request.reducer";
import { RequestStoreState } from "../models";

export const requestStoreReducerImpl: ActionReducerMap<RequestStoreState> = {
    requests: requestReducer

};

export const requestStoreReducer = new InjectionToken<RequestStoreState>("RequestStoreReducer");

export function requestStoreReducerFactory(): ActionReducerMap<RequestStoreState> {
    return requestStoreReducerImpl;
}

export const requestStoreReducerProviders = [{
    provide: requestStoreReducer,
    useFactory: requestStoreReducerFactory
} as FactoryProvider];
