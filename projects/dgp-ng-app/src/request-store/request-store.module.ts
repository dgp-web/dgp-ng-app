import {NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import * as effects from "./effects";
import {requestStoreFeature} from "./models";
import {requestStoreReducer, requestStoreReducerProviders} from "./reducers";

@NgModule({
    imports: [
        StoreModule.forFeature(requestStoreFeature, requestStoreReducer),

        EffectsModule.forFeature([
            effects.RequestEffects
        ])
    ],
    providers: [
        requestStoreReducerProviders,

        effects.RequestEffects
    ]
})
export class DgpRequestStoreModule {
}
