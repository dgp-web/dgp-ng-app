import { Component } from "@angular/core";
import { firstAsPromise } from "../../../utils/first-as-promise";
import { getSelectedFileItem } from "../../../file-upload/selectors";
import { DgpContainer } from "../../../utils/container.component-base";
import { FileUploadState } from "../../../file-upload/models";
import { downloadFile } from "../../../file-upload/actions";

@Component({
    selector: "dgp-download-current-file-item",
    template: `
        <button mat-icon-button
                (click)="downloadCurrentFileItem()"
                matTooltip="Download selected file"
                dgpActionShortcut
                shortcutKey="d">
            <mat-icon>file_download</mat-icon>
        </button>
    `
})
export class DownloadCurrentFileItemComponent extends DgpContainer<FileUploadState> {

    async downloadCurrentFileItem() {
        const fileItem = await firstAsPromise(this.select(getSelectedFileItem));
        this.dispatch(downloadFile({fileItem}));
    }
}
