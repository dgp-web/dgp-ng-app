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
import { fileUploadEntityStore } from "../store";
import { getAllFileItems } from "../selectors";

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
                       [queryParams]="{ fileItemId: fileItem.fileItemId }">
                        <div matLine>
                            {{ fileItem.label }}
                        </div>
                        <!-- TODO: Add item size, an icon, upload date, and type of file -->
                        <!-- TODO: allow removing item -->
                    </a>
                </mat-nav-list>
            </ng-container>

            <a [href]="currentUrl | safe:'url'"
               target="_blank">
                Download
            </a>
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

        const fileItem: FileItem = {
            fileItemId: createGuid(),
            extension: file.type,
            label: "My file",
            size: file.size,
            url: objectUrl
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

}
