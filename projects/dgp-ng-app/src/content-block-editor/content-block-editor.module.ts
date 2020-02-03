import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { contentBlockEditorStore, contentBlockEditorStoreFeature } from "./store";

export const contentBlockEditorReducer = new InjectionToken<typeof contentBlockEditorStore.reducers>(
    contentBlockEditorStoreFeature
);

export function contentBlockEditorReducerFactory() {
    return contentBlockEditorStore.reducers;
}

export const contentBlockEditorReducerProvider: FactoryProvider = {
    provide: contentBlockEditorReducer,
    useFactory: contentBlockEditorReducerFactory
};

@NgModule({
    imports: [
        StoreModule.forFeature(contentBlockEditorStoreFeature, contentBlockEditorReducer)
    ],
    declarations: [],
    exports: [],
    providers: [
        contentBlockEditorReducerProvider
    ]
})
export class DgpContentBlockEditorModule {
}
