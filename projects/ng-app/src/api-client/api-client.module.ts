import { ModuleWithProviders, NgModule, ValueProvider } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import { ApiClientSettings } from "./api-client-settings";

export interface ApiClientSettingsProvider extends ValueProvider {
    provide: typeof ApiClientSettings;
}

@NgModule({ imports: [], providers: [
        provideHttpClient(withXhr(), withInterceptorsFromDi())
    ] })
export class ApiClientModule {

    static forRoot(
        apiClientSettingsProvider: ApiClientSettingsProvider
    ): ModuleWithProviders<ApiClientModule> {
        return {
            ngModule: ApiClientModule,
            providers: [
                apiClientSettingsProvider
            ]
        };
    }

}
