import { createReducer, on } from "@ngrx/store";
import { AuthenticationState } from "./models";
import { authenticateUser, cacheInitialUrl, initialize, registerAuthenticateError } from "./actions";

export const initialAuthenticationState: AuthenticationState = {
    user: null,
    success: null,
    error: null,
    initialUrl: null,
    isInitialized: null
};

export const authenticationReducer = createReducer(
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
    }), on(initialize, (state, action) => {
        return {
            ...state,
            isInitialized: true
        };
    })
);
