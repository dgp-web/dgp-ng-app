import { NgModule } from "@angular/core";
import { DocsPageComponent } from "./docs-page.component";
import { DocsPageContentComponent } from "./docs-page-content.component";
import { DocsCodeBlockComponent } from "./docs-code-block.component";
import { DocsSectionTitleComponent } from "./docs-section-title.component";
import { DocsChapterTitleComponent } from "./docs-chapter-title.component";
import { ModelDescriptionComponent } from "./model-description.component";
import { DgpInspectorModule } from "dgp-ng-app";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        DocsPageComponent,
        DocsPageContentComponent,
        DocsCodeBlockComponent,
        DocsSectionTitleComponent,
        DocsChapterTitleComponent,
        ModelDescriptionComponent
    ],
    imports: [
        DgpInspectorModule,
        CommonModule,
        MatIconModule
    ],
    exports: [
        DocsPageComponent,
        DocsPageContentComponent,
        DocsCodeBlockComponent,
        DocsSectionTitleComponent,
        DocsChapterTitleComponent,
        ModelDescriptionComponent
    ]
})
export class DocsModule {
}
