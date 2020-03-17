import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { FileUploadDocsPageComponent } from "./containers/file-upload-docs-page.component";
import { DgpFileUploadModule } from "dgp-ng-app/file-upload/file-upload.module";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "file-upload",
            component: FileUploadDocsPageComponent
        }]),
        DocsPageModule,
        DgpFileUploadModule
    ],
    declarations: [
        FileUploadDocsPageComponent
    ],
    exports: [],
    providers: []
})
export class FileUploadDocsModule {
}
