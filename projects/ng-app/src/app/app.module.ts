import { ApplicationRef, NgModule } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppComponent } from "./components";
import { UiSharedModule } from "../ui/shared";
import { ApiClientModule, ApiClientSettings, ApiClientSettingsProvider } from "../api-client";
import { appReducer, AppState } from "../store";
import { RouterModule } from "@angular/router";
import * as features from "../features";
import { DgpNgApp, DgpNgAppModule } from "dgp-ng-app";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
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

        DgpNgAppModule.forRoot<AppState>(() => {
            return {
                appReducer
            };
        }),

        features.HomeModule,
        features.AuthenticationDocsModule,
        features.EmptyStateDocsModule,
        features.HamburgerShellDocsModule,
        features.ListDetailsPageDocsModule,
        features.LogDocsModule,
        features.RequestStoreDocsModule,
        features.SpacerDocsModule,
        features.StylingDocsModule,
        features.TableCellEditorDocsModule,
        features.ThemeSwitcherDocsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule extends DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<AppState>) {
        super(appRef, ngrxStore);
    }

}
