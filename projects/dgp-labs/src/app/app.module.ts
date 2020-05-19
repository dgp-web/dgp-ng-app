import { BrowserModule } from "@angular/platform-browser";
import { ApplicationRef, FactoryProvider, Injectable, InjectionToken, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DgpDockingLayoutModule, DgpSplitPanelModule } from "dgp-ng-docking-layout";
import {
    AuthenticationApiClient,
    AuthenticationApiClientProvider,
    DgpAuthenticationModule,
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
        AppRoutingModule,

        StoreModule.forRoot(APP_REDUCER, {
            metaReducers: [hmrReducer]
        }),
        EffectsModule.forRoot([]),
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
