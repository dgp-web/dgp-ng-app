import { FactoryProvider, InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { ActionReducer, StoreModule } from "@ngrx/store";
import { InitializationServiceProvider } from "./services/initialization.service";
import { AuthenticationApiClientProvider } from "./api-clients/authentication.api-client";
import { authenticationReducer } from "./reducers";
import { appInitializerProvider } from "./services/app-initializer.function";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { authenticationServiceProvider } from "./services/authentication.service";
import { AuthenticationState, authenticationStoreFeature } from "./models";

export const AUTHENTICATION_REDUCER = new InjectionToken<ActionReducer<AuthenticationState>>("authenticationReducer");

export function authenticationReducerFactory() {
    return authenticationReducer;
}

export const authenticationReducerProvider: FactoryProvider = {
    provide: AUTHENTICATION_REDUCER,
    useFactory: authenticationReducerFactory
};


export interface AuthenticationModuleSettings {
    readonly authenticationApiClientProvider: AuthenticationApiClientProvider;
    readonly initializationServiceProvider: InitializationServiceProvider;
}

@NgModule({
    imports: [
        StoreModule.forFeature(
            authenticationStoreFeature,
            AUTHENTICATION_REDUCER
        )
    ],
    providers: [
        appInitializerProvider,
        authenticationReducerProvider,
        AuthenticationGuard,
        authenticationServiceProvider
    ]
})
export class DgpAuthenticationModule {

    static forRoot(settings: AuthenticationModuleSettings): ModuleWithProviders<DgpAuthenticationModule> {
        return {
            ngModule: DgpAuthenticationModule,
            providers: [
                settings.authenticationApiClientProvider,
                settings.initializationServiceProvider,
            ]
        };
    }

}
