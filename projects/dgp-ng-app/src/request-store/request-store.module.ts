import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { requestStoreFeature, RequestStoreState } from "./models";
import { RequestEffects } from "./effects";
import { requestStoreReducer } from "./reducers";

export const REQUEST_STORE_REDUCER = new InjectionToken<RequestStoreState>("RequestStoreReducer");

export function requestStoreReducerFactory() {
    return requestStoreReducer;
}

export const requestStoreReducerProvider: FactoryProvider = {
    provide: REQUEST_STORE_REDUCER,
    useFactory: requestStoreReducerFactory
};


@NgModule({
    imports: [
        StoreModule.forFeature(requestStoreFeature, REQUEST_STORE_REDUCER),

        EffectsModule.forFeature([
            RequestEffects
        ])
    ],
    providers: [
        requestStoreReducerProvider
    ]
})
export class DgpRequestStoreModule {
}
