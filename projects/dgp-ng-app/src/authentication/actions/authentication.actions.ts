import { createAction, props } from "@ngrx/store";

export const authenticateUser = createAction("[Authentication] AuthenticateUser", props<{ readonly user: any; }>());
export const cacheInitialUrl = createAction("[Authentication] CacheInitialUrl", props<{ readonly initialUrl: string }>());
export const registerAuthenticateError = createAction("[Authentication] RegisterAuthenticationError", props<{ readonly error: any }>());
