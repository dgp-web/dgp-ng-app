import { ChangeDetectionStrategy, Component, Inject, TemplateRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "dgp-table-cell-editor",
    template: `
        <mat-dialog-content>
            <ng-container *ngTemplateOutlet="template"></ng-container>
        </mat-dialog-content>
    `,
    styles: [`
        mat-dialog-content {
            padding: 0 !important;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DgpTableCellEditorComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) readonly template: TemplateRef<any>
    ) {
    }

}
