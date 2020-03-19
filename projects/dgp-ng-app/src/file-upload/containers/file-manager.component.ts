import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, } from "@angular/core";
import { Store } from "@ngrx/store";
import { addFilesViaDrop, hideDropTarget, removeFile, showDropTarget } from "../actions";
import { FileItem, FileUploadState } from "../models";
import { getAllFileItems, getSelectedFileItem, isDropTargetVisible } from "../selectors";
import { getFileItemsFromFileList, getFileItemSizeLabel } from "../functions";

@Component({
    selector: "dgp-file-manager",
    template: `

        <ng-container *ngIf="(isDropTargetVisible$ | async) === false; else dropTarget">

            <h2 mat-dialog-title
                style="display: flex; align-items: center">
                File upload
                <dgp-spacer></dgp-spacer>
                <button mat-icon-button
                        mat-dialog-close
                        matTooltip="Close dialog">
                    <mat-icon>close</mat-icon>
                </button>
            </h2>

            <dgp-list-details-page>

                <ng-container dgp-list-details-page-menu>
                    <mat-nav-list>
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

                                <div style="flex-grow: 1; display: flex; flex-direction: column">

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
                </ng-container>

                <ng-container *ngIf="selectedFileItem$ | async as selectedFileItem">

                    <div class="preview-container">

                        <ng-container [ngSwitch]="selectedFileItem.extension">

                            <ng-container *ngSwitchCase="'jpg'">

                                <img [src]="selectedFileItem.url | safe:'url'"
                                     alt="{{ selectedFileItem.fileName }}">

                            </ng-container>

                            <ng-container *ngSwitchCase="'png'">

                                <img [src]="selectedFileItem.url | safe:'url'"
                                     alt="{{ selectedFileItem.fileName }}">

                            </ng-container>

                            <ng-container *ngSwitchCase="'svg'">

                                <img [src]="selectedFileItem.url | safe:'url'"
                                     alt="{{ selectedFileItem.fileName }}">

                            </ng-container>

                            <ng-container *ngSwitchCase="'pdf'">

                                <embed [src]="selectedFileItem.url | safe:'resourceUrl'"
                                       type="application/pdf" width="100%" height="100%">

                            </ng-container>

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
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent implements AfterViewInit, OnDestroy {

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
        private readonly store: Store<FileUploadState>
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
}
