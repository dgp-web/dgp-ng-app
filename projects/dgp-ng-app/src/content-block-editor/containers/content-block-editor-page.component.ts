import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { ContentBlockEditorState } from "../store";
import { openAddDocumentDialog } from "../actions";
import { getAllDocuments } from "../selectors";

@Component({
    selector: "dgp-content-block-editor-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Document editor
            <dgp-spacer></dgp-spacer>
            <button mat-icon-button
                    [matTooltip]="'Add new document'"
                    (click)="openAddDocumentDialog()">
                <mat-icon>add</mat-icon>
            </button>
        </dgp-page-header>

        <dgp-list-details-page>

            <div dgp-list-details-page-menu>
                {{ documents$ | async | json }}
            </div>

            <dgp-list-details-page-content>

            </dgp-list-details-page-content>

        </dgp-list-details-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBlockEditorPageComponent {

    readonly documents$ = this.store.select(getAllDocuments);

    constructor(
        private readonly store: Store<ContentBlockEditorState>
    ) {
    }

    openAddDocumentDialog() {
        this.store.dispatch(openAddDocumentDialog());
    }

}
