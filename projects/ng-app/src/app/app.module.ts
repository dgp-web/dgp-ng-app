import { ApplicationRef, NgModule } from "@angular/core";
import { Store, StoreModule } from "@ngrx/store";
import { AppComponent } from "./components";
import { UiSharedModule } from "../ui/shared";
import { ApiClientModule, ApiClientSettings, ApiClientSettingsProvider } from "../api-client";
import { appReducer, appReducerProviders, AppState } from "../store";
import { RouterModule } from "@angular/router";
import * as features from "../features";
import { defaultBroadcastConfig, DgpBroadcastStoreModule, DgpNgApp, setBroadcastChannelDataId } from "dgp-ng-app";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import {
    hmrReducer, DgpRoutingOverlayModule, DgpRequestStoreModule, DgpLogModule, DgpThemeSwitcherModule,
    DgpHamburgerShellModule
} from "dgp-ng-app";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [

        BrowserModule,
        BrowserAnimationsModule,


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

        StoreModule.forRoot(appReducer, {
            metaReducers: [hmrReducer]
        }),
        EffectsModule.forRoot([]),
        DgpHamburgerShellModule.forRoot(),
        DgpThemeSwitcherModule.forRoot(),
        DgpLogModule,
        DgpRequestStoreModule,
        DgpRoutingOverlayModule,

        DgpBroadcastStoreModule.forRoot({
            ...defaultBroadcastConfig,
            actionTypesToPrefixWithPeon: [
                "[DocsApp]"
            ]
        }),

        StoreDevtoolsModule.instrument(),
        /*

                DgpNgAppModule.forRoot<AppState>(() => {
                    return {
                        appReducer: appEntityStore.reducers
                    };
                }),
        */

        features.HomeModule,
        features.AuthenticationDocsModule,
        features.BroadcastingDocsModule,
        features.EmptyStateDocsModule,
        features.HamburgerShellDocsModule,
        features.ListDetailsPageDocsModule,
        features.LogDocsModule,
        features.RequestStoreDocsModule,
        features.RoutingOverlayDocsModule,
        features.SpacerDocsModule,
        features.StylingDocsModule,
        features.TableCellEditorDocsModule,
        features.ThemeSwitcherDocsModule
    ],
    bootstrap: [AppComponent],
    providers: [
        appReducerProviders
    ]
})
export class AppModule extends DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<AppState>) {
        super(appRef, ngrxStore);

        this.ngrxStore.dispatch(setBroadcastChannelDataId({payload: "DgpNgApp"}));
    }

}
