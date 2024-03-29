/**
 * Object describing the outcome
 * of an authentication attempt.
 *
 * Depending on the value of success
 * either the user or the errorMessage
 * attribute is set.
 */
export interface AuthenticationState {
    readonly success: boolean;
    readonly error?: any;
    readonly user?: any;
    readonly initialUrl: string;
    readonly isInitialized?: boolean;
}

export type PostAuthenticationTask<TUser> = (user: TUser) => Promise<void>;

export const authenticationStoreFeature = "Authentication";
