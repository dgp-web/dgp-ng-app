import { BrowserModule } from "@angular/platform-browser";
import { FactoryProvider, Injectable, InjectionToken, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { DgpDockingLayoutModule, DgpSplitPanelModule } from "dgp-ng-docking-layout";
import {
    AuthenticationApiClient,
    AuthenticationApiClientProvider,
    defaultRuntimeChecks,
    DgpAuthenticationModule,
    DgpHamburgerMenuModule,
    DgpHamburgerShellModule, DgpInspectorModule, DgpNegatePipeModule,
    DgpRequestStoreModule,
    DgpRoutingOverlayModule, DgpSpacerModule,
    DgpThemeSwitcherModule,
    InitializationService,
    InitializationServiceProvider
} from "dgp-ng-app";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { createEntityStore } from "entity-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SplitPanelLabsModule } from "./features/split-panel/split-panel-labs.module";
import { DockingLayoutLabsModule } from "./features/docking-layout/docking-layout-labs.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ChartsLabsModule } from "./features/charts/charts-labs.module";
import { ActionContextLabsModule } from "./features/action-context/charts-labs.module";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { DgpDataExportLabsModule } from "./features/data-export/data-export-labs.module";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

// TODO: Investigate whtat happens if reducers are passed
export interface User {
    readonly label: string;
}

export interface AppEntities {
    readonly test;
}

export const appEntityStore = createEntityStore<AppEntities>({
    entityTypes: ["test"]
});

export const APP_REDUCER = new InjectionToken<typeof appEntityStore.reducers>("AppReducer");

export function appReducerFactory() {
    return appEntityStore.reducers;
}

export const appReducerProvider: FactoryProvider = {
    provide: APP_REDUCER,
    useFactory: appReducerFactory
};

@Injectable()
export class AuthenticationApiClientImpl implements AuthenticationApiClient {

    authenticate$(): Promise<User> {
        return Promise.resolve<User>({label: "Test"});
    }

}

export const authenticationApiClientProvider: AuthenticationApiClientProvider = {
    provide: AuthenticationApiClient,
    useClass: AuthenticationApiClientImpl
};

@Injectable()
export class InitializationServiceImpl implements InitializationService {

    runPostAuthenticationTask$(user: any): Promise<void> {
        return Promise.resolve(undefined);
    }

}

export const initializationServiceProvider: InitializationServiceProvider = {
    provide: InitializationService,
    useClass: InitializationServiceImpl
};


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([{
            path: "",
            pathMatch: "full",
            redirectTo: "/docking-layout"
        }, {
            path: "**",
            redirectTo: "/docking-layout"
        }]),

        StoreModule.forRoot(APP_REDUCER, {
            runtimeChecks: defaultRuntimeChecks
        }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument(),
        DgpAuthenticationModule.forRoot({
            authenticationApiClientProvider,
            initializationServiceProvider
        }),
        DgpThemeSwitcherModule.forRoot(),
        DgpHamburgerShellModule.forRoot(),
        DgpRequestStoreModule,
        DgpRoutingOverlayModule,
        MatButtonModule,

        DgpDockingLayoutModule,
        DgpSplitPanelModule,

        SplitPanelLabsModule,
        DockingLayoutLabsModule,
        ChartsLabsModule,
        ActionContextLabsModule,
        DgpHamburgerMenuModule,
        MatListModule,
        DgpDataExportLabsModule,
        DgpInspectorModule.forRoot({
            showFieldIcons: true,
            showFieldDescriptions: true,
            responsive: true
        }),
        MatIconModule,
        DgpNegatePipeModule,
        DgpSpacerModule,
        MatTooltipModule
    ],
    providers: [appReducerProvider],
    bootstrap: [AppComponent]
})
export class AppModule {


}
