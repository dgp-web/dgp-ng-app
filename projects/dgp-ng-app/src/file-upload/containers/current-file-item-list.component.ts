import { Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { getFileItemListModel, isRemoveFilesDisabled } from "../selectors";
import { FileItem } from "../../file-viewer/models";
import { downloadFile, removeFile } from "../actions";

@Component({
    selector: "dgp-current-file-item-list",
    template: `
        <dgp-file-item-list [model]="fileItemListModel$ | async"
                            (fileItemRemoved)="removeFileItem($event)"
                            (fileItemDownloaded)="downloadFileItem($event)"
                            [disabled]="isRemoveFilesDisabled$ | async"></dgp-file-item-list>
        <dgp-spacer></dgp-spacer>
        <dgp-current-add-file-list-item></dgp-current-add-file-list-item>
    `
})
export class CurrentFileItemListComponent extends DgpContainer<FileUploadState> {

    readonly fileItemListModel$ = this.select(getFileItemListModel);
    readonly isRemoveFilesDisabled$ = this.select(isRemoveFilesDisabled);

    removeFileItem(fileItem: FileItem) {
        this.dispatch(removeFile({fileItem}));
    }

    downloadFileItem(fileItem: FileItem) {
        this.dispatch(downloadFile({fileItem}));
    }

}
