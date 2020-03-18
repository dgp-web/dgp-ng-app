import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { addFilesViaDrop } from "../actions";
import { FileItem } from "../models";
import { createGuid } from "../../broadcast/functions/create-guid.function";
import { getAllFileItems, getSelectedFileItem } from "../selectors";

export function getFileItemSizeLabel(size: number): string {

    if (size < 1000) {
        return (size / (1000)).toFixed(2) + " Kb";
    } else {
        return (size / (1000 * 1000)).toFixed(2) + " Mb";
    }

}

@Component({
    selector: "dgp-file-manager",
    template: `
        <dgp-page-header>File upload</dgp-page-header>

        <dgp-list-details-page>

            <ng-container dgp-list-details-page-menu>
                <mat-nav-list>
                    <a *ngFor="let fileItem of fileItems$ | async"
                       mat-list-item
                       [routerLink]="[]"
                       routerLinkActive="dgp-list-item--selected"
                       [queryParams]="{ fileItemId: fileItem.fileItemId }">
                        <mat-icon matListIcon>
                            insert_drive_file
                        </mat-icon>
                        <div matLine
                             style="display: flex; align-items: center;">

                            <div style="flex-grow: 1; display: flex; flex-direction: column">

                                <div style="flex-grow: 1; display: flex;">
                                    {{ fileItem.label }}
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
                                    style="margin-left: 16px;">
                                <mat-icon>
                                    more_vert
                                </mat-icon>
                            </button>

                        </div>
                        <!-- TODO: allow removing item -->
                    </a>
                </mat-nav-list>
            </ng-container>

            <a [href]="currentUrl | safe:'url'"
               target="_blank">
                Download
            </a>

            {{ selectedFileItem$ | async | json }}

        </dgp-list-details-page>
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
export class FileManagerComponent implements AfterViewInit, OnDestroy {

    readonly fileItems$ = this.store.select(getAllFileItems);
    readonly selectedFileItem$ = this.store.select(getSelectedFileItem);

    currentUrl: string;

    readonly dragOverHandler = (e) => {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    }

    readonly dropHandler = (e) => {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();

        const fileList = e.dataTransfer.files;
        const file = fileList.item(0);

        const objectUrl = URL.createObjectURL(file);

        const lastPeriodIndex = file.name.indexOf(".");
        const extension = file.name.substring(lastPeriodIndex, file.name.length);
        const label = file.name.substring(0, lastPeriodIndex);

        const fileItem: FileItem = {
            fileItemId: createGuid(),
            extension,
            label,
            size: file.size,
            url: objectUrl,
            creationDate: new Date(file.lastModified)
        };

        const xhr = new XMLHttpRequest();
        xhr.open("GET", objectUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            if (this.status === 200) {
                console.log(this.response as File);


            }
        };
        xhr.send();

        this.currentUrl = objectUrl;
        this.cd.markForCheck();

        this.store.dispatch(addFilesViaDrop({
            fileItems: [fileItem]
        }));
    }

    constructor(
        private readonly elementRef: ElementRef,
        private readonly store: Store<any>,
        private readonly cd: ChangeDetectorRef
    ) {
    }


    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("dragover", this.dragOverHandler);
        this.elementRef.nativeElement.addEventListener("drop", this.dropHandler);
    }

    ngOnDestroy(): void {
        this.elementRef.nativeElement.removeEventListener("dragover", this.dragOverHandler);
        this.elementRef.nativeElement.removeEventListener("drop", this.dropHandler);
    }

    getFileItemSize(fileItem: FileItem) {
        return getFileItemSizeLabel(fileItem.size);
    }
}
