import { BrowserModule } from "@angular/platform-browser";
import { ApplicationRef, FactoryProvider, Injectable, InjectionToken, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { DgpDockingLayoutModule, DgpSplitPanelModule } from "dgp-ng-docking-layout";
import {
    AuthenticationApiClient,
    AuthenticationApiClientProvider,
    DgpAuthenticationModule,
    DgpHamburgerMenuModule,
    DgpHamburgerShellModule,
    DgpNgApp,
    DgpRequestStoreModule,
    DgpRoutingOverlayModule,
    DgpThemeSwitcherModule,
    hmrReducer,
    InitializationService,
    InitializationServiceProvider
} from "dgp-ng-app";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatButtonModule } from "@angular/material/button";
import { createEntityStore } from "entity-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SplitPanelLabsModule } from "./features/split-panel/split-panel-labs.module";
import { DockingLayoutLabsModule } from "./features/docking-layout/docking-layout-labs.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ChartsLabsModule } from "./features/charts/charts-labs.module";

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
            metaReducers: [hmrReducer]
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
        DgpHamburgerMenuModule
    ],
    providers: [appReducerProvider],
    bootstrap: [AppComponent]
})
export class AppModule extends DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<any>) {
        super(appRef, ngrxStore);
    }

}
