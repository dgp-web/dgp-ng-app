import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { requestStoreFeature } from "./models";
import { requestStoreReducer, requestStoreReducerProviders } from "./reducers/reducer";
import { RequestEffects } from "./effects";

@NgModule({
    imports: [
        StoreModule.forFeature(requestStoreFeature, requestStoreReducer),

        EffectsModule.forFeature([
            RequestEffects
        ])
    ],
    providers: [
        requestStoreReducerProviders,

        RequestEffects
    ]
})
export class DgpRequestStoreModule {
}
