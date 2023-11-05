import { Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { getFileItemListModel, isRemoveFilesDisabled } from "../selectors";

@Component({
    selector: "dgp-current-file-item-list",
    template: `
        <dgp-file-item-list [model]="fileItemListModel$ | async"
                            [disabled]="isRemoveFilesDisabled$ | async"></dgp-file-item-list>
        <dgp-spacer></dgp-spacer>
        <dgp-current-add-file-list-item></dgp-current-add-file-list-item>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
    `]
})
export class CurrentFileItemListComponent extends DgpContainer<FileUploadState> {

    readonly fileItemListModel$ = this.select(getFileItemListModel);
    readonly isRemoveFilesDisabled$ = this.select(isRemoveFilesDisabled);

}
