import { ModuleWithProviders, NgModule } from "@angular/core";
import { PdfViewerComponent } from "./components/pdf-viewer.component";
import { PngViewerComponent } from "./components/png-viewer.component";
import { FileViewerComponent } from "./components/file-viewer.component";
import { FallbackFileViewerComponent } from "./components/fallback-file-viewer.component";
import { FileItemListComponent } from "./components/file-item-list.component";
import { JpgViewerComponent } from "./components/jpg-viewer.component";
import { SvgViewerComponent } from "./components/svg-viewer.component";
import { SafePipe } from "./safe.pipe";
import { PlatformModule } from "@angular/cdk/platform";
import { DgpEmptyStateModule } from "../empty-state/empty-state.module";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { DgpSpacerModule } from "../spacer/spacer.module";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { FILE_VIEWER_CONFIG, FileTypeViewerMap, FileViewerConfig } from "./models";

export const defaultFileTypeViewerMap: FileTypeViewerMap = {
    jpg: JpgViewerComponent,
    pdf: PdfViewerComponent,
    png: PngViewerComponent,
    svg: SvgViewerComponent,
    default: FallbackFileViewerComponent
};

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
    ],
    declarations: [
        SafePipe,
        PdfViewerComponent,
        JpgViewerComponent,
        PngViewerComponent,
        SvgViewerComponent,
        FileViewerComponent,
        FallbackFileViewerComponent,
        FileItemListComponent
    ],
    exports: [
        PdfViewerComponent,
        JpgViewerComponent,
        PngViewerComponent,
        SvgViewerComponent,
        FileViewerComponent,
        FallbackFileViewerComponent,
        FileItemListComponent
    ],
    entryComponents: [
        PdfViewerComponent,
        JpgViewerComponent,
        PngViewerComponent,
        SvgViewerComponent,
        FileViewerComponent,
        FallbackFileViewerComponent
    ],
    providers: [{
        provide: FILE_VIEWER_CONFIG,
        useValue: defaultFileViewerConfig
    }]
})
export class DgpFileViewerModule {

    static forRoot(config = defaultFileViewerConfig): ModuleWithProviders {
        return {
            ngModule: DgpFileViewerModule,
            providers: [{
                provide: FILE_VIEWER_CONFIG,
                useValue: config
            }]
        };
    }

}
