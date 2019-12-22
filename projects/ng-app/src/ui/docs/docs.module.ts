import { NgModule } from "@angular/core";
import { DocsPageComponent } from "./docs-page.component";
import { DocsPageContentComponent } from "./docs-page-content.component";
import { DocsCodeBlockComponent } from "./docs-code-block.component";
import { SafePipeModule } from "../safe-pipe";

@NgModule({
    imports: [
        SafePipeModule
    ],
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
