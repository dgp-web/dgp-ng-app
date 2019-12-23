import { BrowserModule } from "@angular/platform-browser";
import { ApplicationRef, NgModule } from "@angular/core";
import { Store } from "@ngrx/store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import * as dgp from "dgp-ng-app";
import { AppComponent } from "./components";
import { UiSharedModule } from "../ui/shared";
import { ApiClientModule, ApiClientSettings, ApiClientSettingsProvider } from "../api-client";
import { AppState, AppStoreModule } from "../store";
import { authenticationApiClientProvider, initializationServiceProvider } from "./services";
import { RouterModule } from "@angular/router";
import * as features from "../features";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        dgp.DgpAuthenticationModule.forRoot({
            authenticationApiClientProvider,
            initializationServiceProvider
        }),
        dgp.DgpHamburgerShellModule.forRoot(),
        dgp.DgpThemeSwitcherModule.forRoot(),
        dgp.DgpLogModule,

        UiSharedModule,
        ApiClientModule.forRoot({
            provide: ApiClientSettings,
            useValue: {}
        } as ApiClientSettingsProvider),
        RouterModule.forRoot([{
            path: "",
            pathMatch: "full",
            redirectTo: "/home"
        }, {
            path: "**",
            redirectTo: "/home"
        }]),
        AppStoreModule,

        features.HomeModule,
        features.AuthenticationDocsModule,
        features.EmptyStateDocsModule,
        features.HamburgerShellDocsModule,
        features.RequestStoreDocsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule extends dgp.DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<AppState>) {
        super(appRef, ngrxStore);
    }

}
