import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { DgpFileViewerModule } from "dgp-ng-app";
import { FileViewerDocsPageComponent } from "./containers/file-viewer-docs-page.component";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "file-viewer",
            component: FileViewerDocsPageComponent
        }]),
        DocsPageModule,
        DgpFileViewerModule.forRoot()
    ],
    declarations: [
        FileViewerDocsPageComponent
    ]
})
export class FileViewerDocsModule {
}
