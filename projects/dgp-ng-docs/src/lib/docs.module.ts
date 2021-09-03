import { NgModule } from "@angular/core";
import { DocsPageComponent } from "./docs-page.component";
import { DocsPageContentComponent } from "./docs-page-content.component";
import { DocsCodeBlockComponent } from "./docs-code-block.component";
import { DocsSectionTitleComponent } from "./docs-section-title.component";
import { DocsChapterTitleComponent } from "./docs-chapter-title.component";

@NgModule({
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
