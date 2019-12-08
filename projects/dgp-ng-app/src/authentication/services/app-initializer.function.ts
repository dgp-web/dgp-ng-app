import { APP_INITIALIZER, FactoryProvider } from "@angular/core";
import { InitializationService } from "./initialization.service";
import { AuthenticationService } from "./authentication.service";

/**
 * Logic executed before the app loads
 */
export function appInitializer<TUser>(authenticationService: AuthenticationService<TUser>,
                                      initializationService: InitializationService): () => Promise<void> {

    authenticationService.registerPostAuthenticationTask((user: TUser) => {
        return initializationService.runPostAuthenticationTask$(user);
    });

    return () => {

        return authenticationService
            .authenticate$();

    };

}

export const appInitializerProvider: FactoryProvider = {
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    deps: [
        AuthenticationService,
        InitializationService
    ],
    multi: true
};
