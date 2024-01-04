import { ModuleWithProviders, NgModule } from "@angular/core";
import { PdfViewerComponent } from "./components/pdf-viewer.component";
import { PngViewerComponent } from "./components/png-viewer.component";
import { FileViewerComponent } from "./components/file-viewer.component";
import { FallbackFileViewerComponent } from "./components/fallback-file-viewer.component";
import { FileItemListComponent } from "./components/list/file-item-list.component";
import { JpgViewerComponent } from "./components/jpg-viewer.component";
import { SvgViewerComponent } from "./components/svg-viewer.component";
import { PlatformModule } from "@angular/cdk/platform";
import { DgpEmptyStateModule } from "../empty-state/empty-state.module";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { MatIconModule } from "@angular/material/icon";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { FILE_VIEWER_CONFIG, FileTypeViewerMap, FileViewerConfig } from "./models";
import { DynamicFileViewerComponent } from "./components/dynamic-file-viewer.component";
import { SafePipeModule } from "../safe/safe-pipe.module";
import { DgpActionContextModule } from "../action-context/action-context.module";
import { DgpInspectorModule } from "../inspector/inspector.module";
import { DgpShortcutModule } from "../shortcuts/shortcuts.module";
import { RemoveCurrentFileItemActionComponent } from "./components/list/remove-current-file-item-action.component";
import { DgpNegatePipeModule } from "../negate/negate-pipe.module";
import { DownloadCurrentFileItemComponent } from "./components/list/download-current-file-item.component";
import { FileItemListItemComponent } from "./components/list/file-item-list-item.component";

// TODO: Add bmp

export const defaultFileTypeViewerMap: FileTypeViewerMap = {};

export const defaultFileViewerConfig: FileViewerConfig = {
    fileTypeViewerMap: defaultFileTypeViewerMap
};

@NgModule({
    imports: [
        PlatformModule,
        DgpEmptyStateModule,
        MatListModule,
        RouterModule,
        CommonModule,
        MatTooltipModule,
        MatIconModule,
        DgpSpacerModule,
        MatButtonModule,
        MatMenuModule,
        SafePipeModule,
        DgpActionContextModule,
        DgpInspectorModule,
        DgpShortcutModule,
        DgpNegatePipeModule
    ],
    declarations: [
        PdfViewerComponent,
        JpgViewerComponent,
        PngViewerComponent,
        SvgViewerComponent,
        FileViewerComponent,
        FallbackFileViewerComponent,
        FileItemListComponent,
        DynamicFileViewerComponent,
        RemoveCurrentFileItemActionComponent,
        DownloadCurrentFileItemComponent,
        FileItemListItemComponent
    ],
    exports: [
        PdfViewerComponent,
        JpgViewerComponent,
        PngViewerComponent,
        SvgViewerComponent,
        FileViewerComponent,
        FallbackFileViewerComponent,
        FileItemListComponent,
        DynamicFileViewerComponent,
    ],
    providers: [{
        provide: FILE_VIEWER_CONFIG,
        useValue: defaultFileViewerConfig
    }]
})
export class DgpFileViewerModule {

    static forRoot(config = defaultFileViewerConfig): ModuleWithProviders<DgpFileViewerModule> {
        return {
            ngModule: DgpFileViewerModule,
            providers: [{
                provide: FILE_VIEWER_CONFIG,
                useValue: config
            }]
        };
    }

}
