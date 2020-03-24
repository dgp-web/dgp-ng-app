import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragFileListenerDirective } from "./directive/drag-file-listener.directive";
import { EffectsModule } from "@ngrx/effects";
import { FileUploadEffects } from "./effects";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DgpPageHeaderModule } from "../hamburger-shell/components/page-header/page-header.module";
import { DgpListDetailsPageModule } from "../hamburger-shell/components/list-details-page/list-details-page.module";
import { StoreModule } from "@ngrx/store";
import { defaultFileUploadConfig, FILE_UPLOAD_CONFIG, fileUploadStoreFeature } from "./models";
import { fileUploadReducer, fileUploadReducerProvider } from "./store";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { DgpEmptyStateModule } from "../empty-state/empty-state.module";
import { MatTooltipModule } from "@angular/material/tooltip";
import { OpenFileManagerViaShortKeyDirective } from "./directive/open-file-manager-via-short-key.directive";
import { DgpFileViewerModule } from "../file-viewer/file-viewer.module";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        StoreModule.forFeature(fileUploadStoreFeature, fileUploadReducer),
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
        DgpFileViewerModule
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
    entryComponents: [
        FileManagerComponent
    ],
    providers: [
        fileUploadReducerProvider
    ]
})
export class DgpFileUploadModule {

    static forRoot(config = defaultFileUploadConfig): ModuleWithProviders {
        return {
            ngModule: DgpFileUploadModule,
            providers: [{
                provide: FILE_UPLOAD_CONFIG,
                useValue: config
            }]
        };
    }

}
