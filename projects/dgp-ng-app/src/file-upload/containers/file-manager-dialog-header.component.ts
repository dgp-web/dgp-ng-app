import { Component } from "@angular/core";

@Component({
    selector: "dgp-file-manager-dialog-header",
    template: `
        <dgp-spacer></dgp-spacer>
        <dgp-maximize-dialog-button></dgp-maximize-dialog-button>
        <dgp-close-dialog-button></dgp-close-dialog-button>
    `,
    styles: [`
        :host {
            display: flex;
            align-items: center;
        }
    `]
})
export class FileManagerDialogHeaderComponent {

}
