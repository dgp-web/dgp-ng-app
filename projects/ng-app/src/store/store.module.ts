import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { appMetaReducers, appReducer, appReducerProviders } from "./store";
import { EffectsModule } from "@ngrx/effects";
import * as effects from "./effects";
import * as dgp from "dgp-ng-app";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

@NgModule({
    imports: [
        StoreModule.forRoot(
            appReducer, {
                metaReducers: appMetaReducers,
                runtimeChecks: {
                    strictActionImmutability: false,
                    strictActionSerializability: false,
                    strictStateImmutability: false,
                    strictStateSerializability: false
                }
            }
        ),
        EffectsModule.forRoot([
            effects.AppEffects
        ]),

        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

        dgp.DgpRequestStoreModule,
    ],
    providers: [
        appReducerProviders
    ]
})
export class AppStoreModule {
}
