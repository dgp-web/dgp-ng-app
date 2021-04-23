import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { DgpActionContextDirective } from "./directives/action-context.directive";
import { ActionReducer, StoreModule } from "@ngrx/store";
import { ActionContextState } from "./models/action-context-state.model";
import { actionContextStoreFeature } from "./constants/action-context-store-feature.constant";
import { actionContextReducer } from "./reducers/action-context.reducer";

export const directives = [
    DgpActionContextDirective
];

export const ACTION_CONTEXT_REDUCER = new InjectionToken<ActionReducer<ActionContextState>>(actionContextStoreFeature);

export function actionContextReducerFactory() {
    return actionContextReducer;
}

export const actionContextReducerProvider: FactoryProvider = {
    provide: ACTION_CONTEXT_REDUCER,
    useFactory: actionContextReducerFactory
};


@NgModule({
    imports: [
        StoreModule.forFeature(actionContextStoreFeature, ACTION_CONTEXT_REDUCER)
    ],
    declarations: directives,
    exports: directives,
    providers: [
        actionContextReducerProvider
    ]
})
export class DgpActionContextModule {
}
