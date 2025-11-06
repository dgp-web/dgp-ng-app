import { Component, Inject, TemplateRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "dgp-dialog-menu",
    template: `
        <ng-container *ngTemplateOutlet="template"></ng-container>
    `,
    styles: [``]
})
export class DgpDialogMenuComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) readonly template: TemplateRef<any>
    ) {
    }
}
