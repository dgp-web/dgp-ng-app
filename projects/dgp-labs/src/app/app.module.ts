import { BrowserModule } from "@angular/platform-browser";
import { ApplicationRef, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DgpDockingLayoutModule, DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { DgpNgApp, DgpThemeSwitcherModule } from "dgp-ng-app";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DgpDockingLayoutModule,
        DgpSplitPanelModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        DgpThemeSwitcherModule.forRoot(),
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule extends DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<any>) {
        super(appRef, ngrxStore);
    }

}
