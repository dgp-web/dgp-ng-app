import { NgModule } from "@angular/core";
import { SafePipe } from "dgp-ng-app/file-upload/safe.pipe";
import { PdfViewerComponent } from "dgp-ng-app/file-upload/components/pdf-viewer.component";
import { JpgViewerComponent } from "dgp-ng-app/file-upload/components/jpg-viewer.component";
import { PngViewerComponent } from "dgp-ng-app/file-upload/components/png-viewer.component";
import { SvgViewerComponent } from "dgp-ng-app/file-upload/components/svg-viewer.component";
import { FileViewerComponent } from "dgp-ng-app/file-upload/components/file-viewer.component";
import { FallbackFileViewerComponent } from "dgp-ng-app/file-upload/components/fallback-file-viewer.component";
import { FileItemListComponent } from "dgp-ng-app/file-upload/components/file-item-list.component";

@NgModule({
    imports: [],
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
    ]
})
export class DgpFileViewerModule {
}
