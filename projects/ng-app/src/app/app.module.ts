import { BrowserModule } from "@angular/platform-browser";
import { ApplicationRef, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Store, StoreModule } from "@ngrx/store";
import { reducers, metaReducers, State } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./app.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DgpNgApp } from "dgp-ng-app";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
    }
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule extends DgpNgApp {

  constructor(public readonly appRef: ApplicationRef,
            protected readonly ngrxStore: Store<State>) {
    super(appRef, ngrxStore);
  }

}
