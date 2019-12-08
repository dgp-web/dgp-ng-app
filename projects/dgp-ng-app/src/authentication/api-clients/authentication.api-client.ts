import { ClassProvider } from "@angular/core";

/**
 * Service for authenticating the user
 */
export abstract class AuthenticationApiClient<TUser = any> {

    /**
     * Returns the user via a means of
     * authentication
     */
    abstract authenticate$(): Promise<TUser>;

}

export interface AuthenticationApiClientProvider extends ClassProvider {
    provide: typeof AuthenticationApiClient;
}
