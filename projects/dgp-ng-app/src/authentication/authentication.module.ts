import { ModuleWithProviders, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { authenticationStoreFeature } from "./models";
import { authenticationReducer, authenticationReducerProviders } from "./reducers";
import * as guards from "./guards";
import * as services from "./services";
import { AuthenticationApiClientProvider } from "./api-clients";
import { InitializationServiceProvider } from "./services";
import { appInitializerProvider } from "./services";

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
        guards.AuthenticationGuard,
        services.authenticationServiceProvider
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
