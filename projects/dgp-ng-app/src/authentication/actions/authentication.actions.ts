import { Action } from "@ngrx/store";

export const authenticateUserActionType = "[Authentication] AuthenticateUser";

export class AuthenticateUserAction implements Action {
    readonly type = authenticateUserActionType;

    constructor(public readonly user: any) {
    }
}

export const cacheInitialUrlActionType = "[Authentication] CacheInitialUrl";

export class CacheInitialUrlAction implements Action {
    readonly type = cacheInitialUrlActionType;

    constructor(public readonly initialUrl: string) {
    }
}

export const registerAuthenticateErrorActionType = "[Authentication] RegisterAuthenticationError";

export class RegisterAuthenticateErrorAction implements Action {
    readonly type = registerAuthenticateErrorActionType;

    constructor(public readonly error: any) {
    }
}

export type AuthenticationActions = AuthenticateUserAction
    | CacheInitialUrlAction
    | RegisterAuthenticateErrorAction;
