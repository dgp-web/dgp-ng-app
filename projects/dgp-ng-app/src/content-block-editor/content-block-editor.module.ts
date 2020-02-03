import { FactoryProvider, InjectionToken, NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { contentBlockEditorStore, contentBlockEditorStoreFeature } from "./store";
import { ContentBlockEditorPageComponent } from "./containers/content-block-editor-page.component";
import { RouterModule } from "@angular/router";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header/page-header.module";
import { DgpHamburgerMenuToggleModule } from "../hamburger-shell/components/hamburger-menu-toggle/hamburger-menu-toggle.module";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page/list-details-page.module";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EffectsModule } from "@ngrx/effects";
import { ContentBlockEditorEffects } from "./effects";
import { MatDialogModule } from "@angular/material/dialog";
import { AddDocumentDialogComponent } from "./containers/add-document-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

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
        EffectsModule.forRoot([ContentBlockEditorEffects]),
        RouterModule.forChild([{
            path: "content-block-editor",
            component: ContentBlockEditorPageComponent
        }]),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpListDetailsPageModule,
        DgpSpacerModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        ContentBlockEditorPageComponent,
        AddDocumentDialogComponent
    ],
    entryComponents: [
        AddDocumentDialogComponent
    ],
    providers: [
        contentBlockEditorReducerProvider
    ]
})
export class DgpContentBlockEditorModule {
}
