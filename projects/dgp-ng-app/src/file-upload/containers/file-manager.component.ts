import { ChangeDetectionStrategy, Component, } from "@angular/core";
import { addFilesViaDrop, downloadFile, removeFile } from "../actions";
import { FileUploadState } from "../models";
import {
    canOpenFileDrawer,
    getFileItemListModel,
    getSelectedFileItem,
    isAddFilesDisabled,
    isDropTargetVisible,
    isRemoveFilesDisabled
} from "../selectors";
import { getFileItemsFromFileList } from "../functions";
import { FileItem } from "../../file-viewer/models";
import { DgpContainer } from "../../utils/container.component-base";

@Component({
    selector: "dgp-file-manager",
    template: `

        <ng-container *ngIf="(isDropTargetVisible$ | async) === false; else dropTarget">

            <!-- dgp-file-manager-dialog-header -->
            <div style="display: flex; align-items: center">
                <dgp-spacer></dgp-spacer>
                <dgp-maximize-dialog-button></dgp-maximize-dialog-button>
                <dgp-close-dialog-button></dgp-close-dialog-button>
            </div>

            <dgp-list-details-page *ngIf="canOpenFileDrawer$ | async; else singleFileMode">

                <ng-container dgp-list-details-page-menu>
                    <dgp-file-item-list [model]="fileItemListModel$ | async"
                                        (fileItemRemoved)="removeFileItem($event)"
                                        (fileItemDownloaded)="downloadFileItem($event)"
                                        [disabled]="isRemoveFilesDisabled$ | async"></dgp-file-item-list>
                    <dgp-spacer></dgp-spacer>
                    <mat-nav-list *ngIf="!(isAddFilesDisabled$ | async)">
                        <a mat-list-item
                           (click)="filePicker.click()">
                            <mat-icon>
                                open_in_new
                            </mat-icon>
                            <div matLine>
                                Choose file via picker
                            </div>
                            <input hidden
                                   multiple
                                   (change)="onFileSelected($event)"
                                   type="file"
                                   #filePicker>
                        </a>
                    </mat-nav-list>
                </ng-container>

                <dgp-file-viewer [fileItem]="selectedFileItem$ | async"></dgp-file-viewer>

            </dgp-list-details-page>

            <ng-template #singleFileMode>
                <dgp-file-viewer [fileItem]="selectedFileItem$ | async"></dgp-file-viewer>
            </ng-template>
        </ng-container>

        <ng-template #dropTarget>
            <dgp-current-file-drop-zone></dgp-current-file-drop-zone>
        </ng-template>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent extends DgpContainer<FileUploadState> {

    isMaximized = false;

    readonly isDropTargetVisible$ = this.select(isDropTargetVisible);
    readonly fileItemListModel$ = this.select(getFileItemListModel);
    readonly selectedFileItem$ = this.select(getSelectedFileItem);
    readonly isRemoveFilesDisabled$ = this.select(isRemoveFilesDisabled);
    readonly isAddFilesDisabled$ = this.select(isAddFilesDisabled);
    readonly canOpenFileDrawer$ = this.select(canOpenFileDrawer);

    removeFileItem(fileItem: FileItem) {
        this.dispatch(removeFile({fileItem}));
    }

    downloadFileItem(fileItem: FileItem) {
        this.dispatch(downloadFile({fileItem}));
    }

    onFileSelected(e) {
        const fileItems = getFileItemsFromFileList(e.target.files);
        this.dispatch(addFilesViaDrop({fileItems}));
    }

}
