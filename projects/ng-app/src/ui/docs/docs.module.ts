import { NgModule } from "@angular/core";
import { DocsPageComponent } from "./docs-page.component";
import { DocsPageContentComponent } from "./docs-page-content.component";
import { DocsCodeBlockComponent } from "./docs-code-block.component";

@NgModule({
    imports: [],
    declarations: [
        DocsPageComponent,
        DocsPageContentComponent,
        DocsCodeBlockComponent
    ],
    exports: [
        DocsPageComponent,
        DocsPageContentComponent,
        DocsCodeBlockComponent
    ]
})
export class DocsModule {
}
