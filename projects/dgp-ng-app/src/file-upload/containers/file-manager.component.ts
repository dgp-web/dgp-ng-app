import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, } from "@angular/core";
import { Store } from "@ngrx/store";
import { addFilesViaDrop, hideDropTarget, removeFile, showDropTarget } from "../actions";
import { FILE_UPLOAD_CONFIG, FileItem, FileUploadConfig, FileUploadState } from "../models";
import { getAllFileItems, getSelectedFileItem, isDropTargetVisible } from "../selectors";
import { getFileItemsFromFileList, getFileItemSizeLabel } from "../functions";
import { MatDialogRef } from "@angular/material/dialog";

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
                    <mat-icon>maximize</mat-icon>
                </button>
                <button *ngIf="isMaximized"
                        mat-icon-button
                        (click)="minimize()"
                        matTooltip="Minimize">
                    <mat-icon>minimize</mat-icon>
                </button>
                <button mat-icon-button
                        mat-dialog-close
                        matTooltip="Close dialog">
                    <mat-icon>close</mat-icon>
                </button>
            </h2>

            <dgp-list-details-page>

                <ng-container dgp-list-details-page-menu>
                    <mat-nav-list style="overflow: auto;">
                        <a *ngFor="let fileItem of fileItems$ | async"
                           mat-list-item
                           [routerLink]="[]"
                           routerLinkActive="dgp-list-item --selected"
                           [queryParams]="{ fileItemId: fileItem.fileItemId }">
                            <mat-icon matListIcon>
                                insert_drive_file
                            </mat-icon>
                            <div matLine
                                 style="display: flex; align-items: center;">

                                <div style="flex-grow: 1; display: flex; flex-direction: column; overflow: hidden;">

                                    <div style="flex-grow: 1; display: flex;">
                                        {{ fileItem.fileName }}
                                        <dgp-spacer></dgp-spacer>
                                        <small>{{ fileItem.extension }}</small>
                                    </div>

                                    <div style="display: flex;">
                                        <small>{{ fileItem.creationDate | date:'hh:mm, dd MMMM yyyy' }}</small>
                                        <dgp-spacer></dgp-spacer>
                                        <small>{{ getFileItemSize(fileItem) }}</small>
                                    </div>
                                </div>

                                <button mat-icon-button
                                        style="margin-left: 16px;"
                                        [matMenuTriggerFor]="overflowMenu">

                                    <mat-icon>
                                        more_vert
                                    </mat-icon>

                                </button>

                                <mat-menu #overflowMenu="matMenu">
                                    <button mat-menu-item
                                            (click)="removeFileItem(fileItem)">Remove
                                    </button>
                                </mat-menu>

                            </div>
                        </a>
                    </mat-nav-list>
                    <dgp-spacer></dgp-spacer>
                    <mat-nav-list>
                        <a mat-list-item
                           (click)="filePicker.click()">
                            <mat-icon>
                                open_in_new
                            </mat-icon>
                            <div matLine>
                                Choose file via picker
                            </div>
                            <input hidden
                                   multiple="true"
                                   (change)="onFileSelected($event)"
                                   type="file"
                                   #filePicker>
                        </a>
                    </mat-nav-list>
                </ng-container>

                <ng-container *ngIf="selectedFileItem$ | async as selectedFileItem">

                    <div class="preview-container">

                        <ng-container [ngSwitch]="selectedFileItem.extension">

                            <dgp-jpg-viewer *ngSwitchCase="'jpg'"
                                            [fileItem]="selectedFileItem"></dgp-jpg-viewer>

                            <ng-container *ngSwitchCase="'png'">

                                <img [src]="selectedFileItem.url | safe:'url'"
                                     class="image"
                                     alt="{{ selectedFileItem.fileName }}">

                            </ng-container>

                            <ng-container *ngSwitchCase="'svg'">

                                <img [src]="selectedFileItem.url | safe:'url'"
                                     class="image"
                                     alt="{{ selectedFileItem.fileName }}">

                            </ng-container>

                            <dgp-pdf-viewer *ngSwitchCase="'pdf'"
                                            [fileItem]="selectedFileItem"></dgp-pdf-viewer>

                            <ng-container *ngSwitchDefault>

                                <dgp-empty-state title="No preview available"
                                                 matIconName="get_app">

                                    <a class="download-link"
                                       [href]="selectedFileItem.url | safe:'url'"
                                       target="_blank">
                                        Download it here
                                    </a>

                                </dgp-empty-state>

                            </ng-container>

                        </ng-container>

                    </div>
                </ng-container>

            </dgp-list-details-page>

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
                        (click)="filePicker.click()"
                        style="display: flex; max-width: 480px; width: 100%; justify-content: center; margin-top: 16px;">
                    <mat-icon style="margin-right: 4px;">open_in_new</mat-icon>
                    Choose file via picker
                </button>

                <input hidden
                       multiple="true"
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

        .preview-container {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .download-link {
            color: inherit;
        }

        .drop-target {
            border: 2px dashed white;
            max-height: 100%;
        }

        .image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent implements AfterViewInit, OnDestroy {

    isMaximized = false;

    readonly isDropTargetVisible$ = this.store.select(isDropTargetVisible);
    readonly fileItems$ = this.store.select(getAllFileItems);
    readonly selectedFileItem$ = this.store.select(getSelectedFileItem);

    readonly dragEnterHandler = (e) => {
        e.preventDefault();
        this.store.dispatch(showDropTarget());
    };

    readonly dragLeaveHandler = (e) => {
        e.preventDefault();
        this.store.dispatch(hideDropTarget());
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
        private readonly elementRef: ElementRef,
        private readonly store: Store<FileUploadState>,
        private readonly dialogRef: MatDialogRef<FileManagerComponent>,
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly moduleConfig: FileUploadConfig
    ) {
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

    getFileItemSize(fileItem: FileItem) {
        return getFileItemSizeLabel(fileItem.size);
    }

    removeFileItem(fileItem: FileItem) {
        this.store.dispatch(removeFile({fileItem}));
    }

    onFileSelected(e) {
        const fileItems = getFileItemsFromFileList(e.target.files);
        this.store.dispatch(addFilesViaDrop({fileItems}));
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
