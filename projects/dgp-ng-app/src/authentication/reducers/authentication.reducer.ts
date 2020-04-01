import { ActionReducer, createReducer, on } from "@ngrx/store";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { AuthenticationState } from "../models/authentication-result.model";
import { authenticateUser, cacheInitialUrl, registerAuthenticateError } from "../actions/authentication.actions";

export const initialAuthenticationState: AuthenticationState = {
    user: null,
    success: null,
    error: null,
    initialUrl: null
};

export const authenticationReducerImpl = createReducer(
    initialAuthenticationState, on(
        authenticateUser, (state, action) => {
            return {
                ...state,
                user: action.user,
                success: true
            };
        }
    ), on(cacheInitialUrl, (state, action) => {
        return {
            ...state,
            initialUrl: action.initialUrl
        };
    }), on(registerAuthenticateError, (state, action) => {
        return {
            ...state,
            error: action.error,
            success: false
        };
    })
);


export const authenticationReducer = new InjectionToken<ActionReducer<AuthenticationState>>("authenticationReducer");

export function authenticationReducerFactory() {
    return authenticationReducerImpl;
}

export const authenticationReducerProvider: FactoryProvider = {
    provide: authenticationReducer,
    useFactory: authenticationReducerFactory
};

