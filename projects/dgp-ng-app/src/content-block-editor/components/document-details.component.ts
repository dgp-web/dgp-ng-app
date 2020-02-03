import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { ContentBlock, Document, Section } from "../models";

export interface SectionPresentationModel extends Section {
    readonly contentBlocks: ReadonlyArray<ContentBlock>;
}

export interface DocumentPresentationModel extends Document {
    readonly sections: ReadonlyArray<SectionPresentationModel>;
}

@Component({
    selector: "dgp-document-details",
    template: `
        <h1> {{ document.label }} </h1>

        <section *ngFor="let section of document.sections">
            <h2> {{ section.label }} </h2>

            <div *ngFor="let contentBlock of section.contentBlocks">

                {{ contentBlock.label }}

            </div>

        </section>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailsComponent {

    @Input()
    document: DocumentPresentationModel;

}
