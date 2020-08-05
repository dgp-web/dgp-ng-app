import { APP_INITIALIZER, FactoryProvider } from "@angular/core";
import { InitializationService } from "./initialization.service";
import { AuthenticationService } from "./authentication.service";
import { Store } from "@ngrx/store";
import { setOwnBroadcastRole } from "../../broadcast/actions";
import { BroadcastRole } from "../../broadcast/models";

/**
 * Logic executed before the app loads
 */
export function appInitializer<TUser>(authenticationService: AuthenticationService<TUser>,
                                      initializationService: InitializationService,
                                      store: Store<any>): () => Promise<void> {

    if (window.location.href.includes("startAsPeon=true")) return () => {
        store.dispatch(setOwnBroadcastRole({
            broadcastRole: BroadcastRole.Peon
        }));
        return Promise.resolve();
    };

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
        InitializationService,
        Store
    ],
    multi: true
};
