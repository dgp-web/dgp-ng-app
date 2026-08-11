import { Component, Inject, TemplateRef, ChangeDetectionStrategy } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "dgp-dialog-menu",
    template: `
        <ng-container *ngTemplateOutlet="template"></ng-container>
    `,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DgpDialogMenuComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) readonly template: TemplateRef<any>
    ) {
    }
}
