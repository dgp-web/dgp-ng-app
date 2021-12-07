import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../../shared";
import { FileUploadDocsPageComponent } from "./containers/file-upload-docs-page.component";
import { DgpFileUploadModule } from "dgp-ng-app";
import { DgpFileViewerModule } from "dgp-ng-app";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "file-upload",
            component: FileUploadDocsPageComponent
        }]),
        DocsPageModule,
        DgpFileViewerModule.forRoot(),
        DgpFileUploadModule.forRoot()
    ],
    declarations: [
        FileUploadDocsPageComponent
    ],
    exports: [],
    providers: []
})
export class FileUploadDocsModule {
}
