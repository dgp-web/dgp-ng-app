import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, } from "@angular/core";
import { Store } from "@ngrx/store";
import { addFilesViaDrop, hideDropTarget, removeFile, showDropTarget } from "../actions";
import { FILE_UPLOAD_CONFIG, FileUploadConfig, FileUploadState } from "../models";
import {
    canOpenFileDrawer,
    getFileItemListModel,
    getSelectedFileItem,
    isAddFilesDisabled,
    isDropTargetVisible,
    isRemoveFilesDisabled
} from "../selectors";
import { getFileItemsFromFileList } from "../functions";
import { MatDialogRef } from "@angular/material/dialog";
import { FileItem } from "../../file-viewer/models";
import { DgpContainer } from "../../utils/container.component-base";

@Component({
    selector: "dgp-file-manager",
    template: `

        <ng-container *ngIf="(isDropTargetVisible$ | async) === false; else dropTarget">

            <h2 mat-dialog-title
                style="display: flex; align-items: center">
                File manager
                <dgp-spacer></dgp-spacer>
                <button *ngIf="!isMaximized"
                        mat-icon-button
                        (click)="maximize()"
                        matTooltip="Maximize">
                    <mat-icon>crop_din</mat-icon>
                </button>
                <button *ngIf="isMaximized"
                        mat-icon-button
                        (click)="minimize()"
                        matTooltip="Minimize">
                    <mat-icon>filter_none</mat-icon>
                </button>
                <button mat-icon-button
                        mat-dialog-close
                        matTooltip="Close dialog">
                    <mat-icon>close</mat-icon>
                </button>
            </h2>

            <dgp-list-details-page *ngIf="canOpenFileDrawer$ | async; else singleFileMode">

                <ng-container dgp-list-details-page-menu>
                    <dgp-file-item-list [model]="fileItemListModel$ | async"
                                        (fileItemRemoved)="removeFileItem($event)"
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

            <dgp-empty-state title="Drop file here"
                             matIconName="get_app"
                             class="drop-target">
                Drop one or more files into this zone to upload them.
                <br>
                You can preview them afterward.
                <br>
                <button mat-button
                        [disabled]="isAddFilesDisabled$ | async"
                        (click)="filePicker.click()"
                        style="display: flex; max-width: 480px; width: 100%; justify-content: center; margin-top: 16px;">
                    <mat-icon style="margin-right: 4px;">open_in_new</mat-icon>
                    Choose file via picker
                </button>

                <input hidden
                       multiple
                       (change)="onFileSelected($event)"
                       type="file"
                       #filePicker>

            </dgp-empty-state>

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

        .drop-target {
            border: 2px dashed white;
            max-height: 100%;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent extends DgpContainer<FileUploadState> implements AfterViewInit, OnDestroy {

    isMaximized = false;

    readonly isDropTargetVisible$ = this.select(isDropTargetVisible);
    readonly fileItemListModel$ = this.select(getFileItemListModel);
    readonly selectedFileItem$ = this.select(getSelectedFileItem);
    readonly isRemoveFilesDisabled$ = this.select(isRemoveFilesDisabled);
    readonly isAddFilesDisabled$ = this.select(isAddFilesDisabled);
    readonly canOpenFileDrawer$ = this.select(canOpenFileDrawer);

    readonly dragEnterHandler = (e) => {
        e.preventDefault();
        this.dispatch(showDropTarget());
    };

    readonly dragLeaveHandler = (e) => {
        e.preventDefault();
        this.dispatch(hideDropTarget());
    };

    readonly dragOverHandler = (e) => {
        e.preventDefault();
    };

    readonly dropHandler = (e) => {
        e.preventDefault();

        const fileItems = getFileItemsFromFileList(e.dataTransfer.files);
        this.store.dispatch(hideDropTarget());
        this.store.dispatch(addFilesViaDrop({fileItems}));
    };

    constructor(
        protected readonly store: Store<FileUploadState>,
        private readonly elementRef: ElementRef,
        private readonly dialogRef: MatDialogRef<FileManagerComponent>,
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly moduleConfig: FileUploadConfig
    ) {
        super(store);
    }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("dragenter", this.dragEnterHandler);
        this.elementRef.nativeElement.addEventListener("dragleave", this.dragLeaveHandler);
        this.elementRef.nativeElement.addEventListener("drop", this.dropHandler);
        this.elementRef.nativeElement.addEventListener("dragover", this.dragOverHandler);
    }

    ngOnDestroy(): void {
        this.elementRef.nativeElement.removeEventListener("dragenter", this.dragEnterHandler);
        this.elementRef.nativeElement.removeEventListener("dragleave", this.dragLeaveHandler);
        this.elementRef.nativeElement.removeEventListener("drop", this.dropHandler);
        this.elementRef.nativeElement.removeEventListener("dragover", this.dragOverHandler);
    }

    removeFileItem(fileItem: FileItem) {
        this.dispatch(removeFile({fileItem}));
    }

    onFileSelected(e) {
        const fileItems = getFileItemsFromFileList(e.target.files);
        this.dispatch(addFilesViaDrop({fileItems}));
    }

    maximize() {
        this.dialogRef.addPanelClass(this.moduleConfig.maximizedClass);
        this.isMaximized = true;
    }

    minimize() {
        this.dialogRef.removePanelClass(this.moduleConfig.maximizedClass);
        this.isMaximized = false;
    }
}
