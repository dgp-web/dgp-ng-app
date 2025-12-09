import { Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { getSelectedFileItem } from "../selectors";

@Component({
    selector: "dgp-current-file-viewer",
    template: `
        <dgp-file-viewer [fileItem]="selectedFileItem$ | async"></dgp-file-viewer>
        <dgp-select-previous-file-item-action />
        <dgp-select-next-file-item-action />
    `,
    styles: [`
        :host {
            display: flex;
            width: 100%;
            height: 100%;
            position: relative;
        }

        dgp-select-previous-file-item-action {
            position: absolute;
            align-self: center;
            left: 0;
        }

        dgp-select-next-file-item-action {
            position: absolute;
            align-self: center;
            right: 0;
        }
    `]
})
export class CurrentFileViewerComponent extends DgpContainer<FileUploadState> {
    readonly selectedFileItem$ = this.select(getSelectedFileItem);
}
