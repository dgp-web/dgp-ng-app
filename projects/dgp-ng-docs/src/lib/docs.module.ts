import { NgModule } from "@angular/core";
import { DocsPageComponent } from "./docs-page.component";
import { DocsPageContentComponent } from "./docs-page-content.component";
import { DocsCodeBlockComponent } from "./docs-code-block.component";
import { SafePipeModule } from "./safe-pipe/safe-pipe.module";
import { DocsSectionTitleComponent } from "./docs-section-title.component";
import { DocsChapterTitleComponent } from "./docs-chapter-title.component";

@NgModule({
    imports: [
        SafePipeModule
    ],
    declarations: [
        DocsPageComponent,
        DocsPageContentComponent,
        DocsCodeBlockComponent,
        DocsSectionTitleComponent,
        DocsChapterTitleComponent
    ],
    exports: [
        DocsPageComponent,
        DocsPageContentComponent,
        DocsCodeBlockComponent,
        DocsSectionTitleComponent,
        DocsChapterTitleComponent
    ]
})
export class DocsModule {
}
