import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { contentBlockEditorStore, contentBlockEditorStoreFeature } from "./store";
import { ContentBlockEditorPageComponent } from "./containers/content-block-editor-page.component";
import { RouterModule } from "@angular/router";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header/page-header.module";
import { DgpHamburgerMenuToggleModule } from "../hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.module";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page/list-details-page.module";

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
        StoreModule.forFeature(contentBlockEditorStoreFeature, contentBlockEditorReducer),
        RouterModule.forChild([{
            path: "content-block-editor",
            component: ContentBlockEditorPageComponent
        }]),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpListDetailsPageModule
    ],
    declarations: [
        ContentBlockEditorPageComponent
    ],
    exports: [],
    providers: [
        contentBlockEditorReducerProvider
    ]
})
export class DgpContentBlockEditorModule {
}
