import { Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { isAddFilesDisabled } from "../selectors";
import { getFileItemsFromFileList } from "../functions";
import { addFilesViaDrop } from "../actions";

@Component({
    selector: "dgp-current-add-file-list-item",
    template: `
        @if (isAddFilesDisabled$ | async | negate) {
          <mat-action-list>
            <mat-list-item (click)="filePicker.click()"
              matTooltip="Click to choose files"
              dgpActionShortcut
              shortcutKey="p"
              [requireShift]="true"
              [requireCtrl]="true"
              [requireAlt]="true">
              <mat-icon matListItemIcon>
                open_in_new
              </mat-icon>
              <div matListItemTitle>
                Choose file via picker
              </div>
              <input hidden
                multiple
                (change)="onFileSelected($event)"
                type="file"
                #filePicker>
              </mat-list-item>
            </mat-action-list>
          }
        `,
    standalone: false
})
export class CurrentAddFileListItemComponent extends DgpContainer<FileUploadState> {
    readonly isAddFilesDisabled$ = this.select(isAddFilesDisabled);

    onFileSelected(e) {
        const fileItems = getFileItemsFromFileList(e.target.files);
        this.dispatch(addFilesViaDrop({fileItems}));
    }
}
