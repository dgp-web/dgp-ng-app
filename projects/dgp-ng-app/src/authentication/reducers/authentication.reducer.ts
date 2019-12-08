import {
    authenticateUserActionType,
    AuthenticationActions,
    cacheInitialUrlActionType,
    registerAuthenticateErrorActionType
} from "../actions";
import { AuthenticationState } from "../models";
import { ActionReducer } from "@ngrx/store";
import { FactoryProvider, InjectionToken } from "@angular/core";

const initialState: AuthenticationState = {
    user: null,
    success: null,
    error: null,
    initialUrl: null
};

export function _authenticationReducer<TUser>(
    state = initialState,
    action: AuthenticationActions
): AuthenticationState {

    switch (action.type) {

        case authenticateUserActionType: {
            return {
                ...state,
                user: action.user,
                success: true
            };
        }

        case cacheInitialUrlActionType: {
            return {
                ...state,
                initialUrl: action.initialUrl
            };
        }

        case registerAuthenticateErrorActionType: {
            return {
                ...state,
                error: action.error,
                success: false
            };
        }

        default: {
            return state;
        }
    }

}

export const authenticationReducer = new InjectionToken<ActionReducer<AuthenticationState>>("authenticationReducer");

export function authenticationReducerFactory(): ActionReducer<AuthenticationState> {
    return _authenticationReducer;
}

export const authenticationReducerProviders = [{
    provide: authenticationReducer,
    useFactory: authenticationReducerFactory
} as FactoryProvider];

