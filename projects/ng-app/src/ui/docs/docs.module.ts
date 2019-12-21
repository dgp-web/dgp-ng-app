import { NgModule } from "@angular/core";
import { DocsPageComponent } from "./docs-page.component";
import { DocsPageContentComponent } from "./docs-page-content.component";

@NgModule({
    imports: [],
    declarations: [
        DocsPageComponent,
        DocsPageContentComponent
    ],
    exports: [
        DocsPageComponent,
        DocsPageContentComponent
    ]
})
export class DocsModule {
}
