import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { FileUploadDocsPageComponent } from "./containers/file-upload-docs-page.component";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "file-upload",
            component: FileUploadDocsPageComponent
        }]),
        DocsPageModule
    ],
    declarations: [
        FileUploadDocsPageComponent
    ],
    exports: [],
    providers: []
})
export class FileUploadDocsModule {
}
