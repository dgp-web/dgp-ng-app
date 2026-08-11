import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-close-dialog-button",
    template: `
        <button mat-icon-button
                mat-dialog-close
                matTooltip="Close dialog">
            <mat-icon>close</mat-icon>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CloseDialogButtonComponent {

}
