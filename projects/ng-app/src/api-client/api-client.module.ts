import { ModuleWithProviders, NgModule, ValueProvider } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApiClientSettings } from "./api-client-settings";

export interface ApiClientSettingsProvider extends ValueProvider {
    provide: typeof ApiClientSettings;
}

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        // Add providers for api clients and related services
    ]
})
export class ApiClientModule {

    static forRoot(
        apiClientSettingsProvider: ApiClientSettingsProvider
    ): ModuleWithProviders {
        return {
            ngModule: ApiClientModule,
            providers: [
                apiClientSettingsProvider
            ]
        };
    }

}
