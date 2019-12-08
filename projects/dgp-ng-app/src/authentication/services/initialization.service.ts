import { ClassProvider } from "@angular/core";

/**
 * Service that runs tasks once the user is authenticated
 * but before the application actually starts.
 *
 * Use for downloading basic data or load user settings.
 */
export abstract class InitializationService<TUser = any> {

    /**
     * Runs tasks on app start
     *
     * @param {TUser} user
     * @returns {Promise<void>}
     */
    abstract runPostAuthenticationTask$(user: TUser): Promise<void>;

}

export interface InitializationServiceProvider extends ClassProvider {
    provide: typeof InitializationService;
}
