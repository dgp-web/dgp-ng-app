import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { ContentBlock, ContentBlockId, Document, Section } from "../models";

export interface SectionPresentationModel extends Section {
    readonly contentBlocks: ReadonlyArray<ContentBlock>;
}

export interface DocumentPresentationModel extends Document {
    readonly sections: ReadonlyArray<SectionPresentationModel>;
    readonly selectedContentBlockId?: ContentBlockId;
}

@Component({
    selector: "dgp-document-details",
    template: `
        <h1> {{ document.label }} </h1>

        <section *ngFor="let section of document.sections">
            <h2> {{ section.label }} </h2>

            <div *ngFor="let contentBlock of section.contentBlocks"
                 (click)="selectedContentBlock(contentBlock)">

                {{ contentBlock.label }}

            </div>

        </section>

        <ng-container *ngIf="document.selectedContentBlockId">
            {{ document.selectedContentBlockId | json }}
        </ng-container>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailsComponent {

    @Input()
    document: DocumentPresentationModel;

    @Output()
    readonly selectedContentBlockChange = new EventEmitter<ContentBlockId>();

    selectedContentBlock(contentBlockId: ContentBlockId) {
        this.selectedContentBlockChange.emit(contentBlockId);
    }
}
