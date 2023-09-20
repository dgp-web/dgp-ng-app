import { FactoryProvider, InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragFileListenerDirective } from "./directive/drag-file-listener.directive";
import { EffectsModule } from "@ngrx/effects";
import { FileUploadEffects } from "./effects";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header/page-header.module";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page/list-details-page.module";
import { StoreModule } from "@ngrx/store";
import { defaultFileUploadConfig, FILE_UPLOAD_CONFIG, FileUploadState, fileUploadStoreFeature } from "./models";
import { fileUploadReducer } from "./store";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { DgpEmptyStateModule } from "../empty-state/empty-state.module";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { OpenFileManagerViaShortKeyDirective } from "./directive/open-file-manager-via-short-key.directive";
import { DgpFileViewerModule } from "../file-viewer/file-viewer.module";
import { DgpShortcutModule } from "../shortcuts/shortcuts.module";

export const FILE_UPLOAD_REDUCER = new InjectionToken<FileUploadState>("hamburgerShellReducer");

export function fileUploadReducerFactory() {
    return fileUploadReducer;
}

export const fileUploadReducerProvider: FactoryProvider = {
    provide: FILE_UPLOAD_REDUCER,
    useFactory: fileUploadReducerFactory
};

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        StoreModule.forFeature(fileUploadStoreFeature, FILE_UPLOAD_REDUCER),
        EffectsModule.forFeature([
            FileUploadEffects
        ]),
        DgpPageHeaderModule,
        DgpListDetailsPageModule,
        MatListModule,
        RouterModule,
        MatIconModule,
        DgpSpacerModule,
        MatButtonModule,
        MatMenuModule,
        DgpEmptyStateModule,
        MatTooltipModule,
        DgpFileViewerModule,
        DgpShortcutModule
    ],
    declarations: [
        DragFileListenerDirective,
        OpenFileManagerViaShortKeyDirective,
        FileManagerComponent
    ],
    exports: [
        DragFileListenerDirective,
        OpenFileManagerViaShortKeyDirective
    ],
    providers: [
        fileUploadReducerProvider, {
            provide: FILE_UPLOAD_CONFIG,
            useValue: defaultFileUploadConfig
        }
    ]
})
export class DgpFileUploadModule {

    static forRoot(config = defaultFileUploadConfig): ModuleWithProviders<DgpFileUploadModule> {
        return {
            ngModule: DgpFileUploadModule,
            providers: [{
                provide: FILE_UPLOAD_CONFIG,
                useValue: config
            }]
        };
    }

}
