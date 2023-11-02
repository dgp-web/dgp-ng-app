import { Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { getSelectedFileItem } from "../selectors";

@Component({
    selector: "dgp-current-file-viewer",
    template: `
        <dgp-file-viewer [fileItem]="selectedFileItem$ | async"></dgp-file-viewer>
    `,
    styles: [`
        :host {
            display: flex;
            width: 100%;
            height: 100%;
        }
    `]
})
export class CurrentFileViewerComponent extends DgpContainer<FileUploadState> {
    readonly selectedFileItem$ = this.select(getSelectedFileItem);
}
