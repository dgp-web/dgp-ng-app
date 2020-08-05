import { createAction, props } from "@ngrx/store";

export const authenticationActionTypePrefix = "[Authentication] ";

export const authenticateUser = createAction(authenticationActionTypePrefix + "AuthenticateUser", props<{ readonly user: any; }>());
export const cacheInitialUrl = createAction(authenticationActionTypePrefix + "CacheInitialUrl", props<{ readonly initialUrl: string }>());
export const registerAuthenticateError = createAction(authenticationActionTypePrefix + "RegisterAuthenticationError", props<{ readonly error: any }>());
