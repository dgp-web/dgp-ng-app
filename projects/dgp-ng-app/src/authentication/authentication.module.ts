import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { InitializationServiceProvider } from "./services/initialization.service";
import { authenticationStoreFeature } from "./models/authentication-store-feature";
import { AuthenticationApiClientProvider } from "./api-clients/authentication.api-client";
import { authenticationReducer, authenticationReducerProviders } from "./reducers/authentication.reducer";
import { appInitializerProvider } from "./services/app-initializer.function";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { authenticationServiceProvider } from "./services/authentication.service";

export interface AuthenticationModuleSettings {
    readonly authenticationApiClientProvider: AuthenticationApiClientProvider;
    readonly initializationServiceProvider: InitializationServiceProvider;
}

@NgModule({
    imports: [
        StoreModule.forFeature(
            authenticationStoreFeature,
            authenticationReducer
        )
    ],
    providers: [
        appInitializerProvider,
        authenticationReducerProviders,
        AuthenticationGuard,
        authenticationServiceProvider
    ]
})
export class DgpAuthenticationModule {

    static forRoot(settings: AuthenticationModuleSettings): ModuleWithProviders {
        return {
            ngModule: DgpAuthenticationModule,
            providers: [
                settings.authenticationApiClientProvider,
                settings.initializationServiceProvider,
            ]
        };
    }

}
