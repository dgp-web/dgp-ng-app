import { Component } from "@angular/core";
import { FileUploadState } from "../models";
import { DgpContainer } from "../../utils/container.component-base";
import { isAddFilesDisabled } from "../selectors";
import { addFilesViaDrop } from "../actions";
import { FileItem } from "../../file-viewer/models";
import { Many } from "data-modeling";

@Component({
    selector: "dgp-current-file-drop-zone",
    template: `
        <dgp-file-drop-zone [disabled]="isAddFilesDisabled$ | async"
                            (filesAdded)="addFiles($event)"></dgp-file-drop-zone>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
    `]
})
export class CurrentFileDropZoneComponent extends DgpContainer<FileUploadState> {

    readonly isAddFilesDisabled$ = this.select(isAddFilesDisabled);

    addFiles(fileItems: Many<FileItem>) {
        this.dispatch(addFilesViaDrop({fileItems}));
    }

}
