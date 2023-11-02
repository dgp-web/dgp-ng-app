import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { FileUploadState } from "../models";
import { DgpContainer } from "../../utils/container.component-base";
import { isAddFilesDisabled } from "../selectors";
import { addFilesViaDrop, hideDropTarget, showDropTarget } from "../actions";
import { getFileItemsFromFileList } from "../functions";

@Component({
    selector: "dgp-current-file-drop-zone",
    template: `
        <dgp-empty-state title="Drop file here"
                         matIconName="get_app">
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
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        dgp-empty-state {
            border: 2px dashed white;
            max-height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentFileDropZoneComponent extends DgpContainer<FileUploadState> implements AfterViewInit, OnDestroy {

    readonly isAddFilesDisabled$ = this.select(isAddFilesDisabled);

    readonly dragEnterHandler = (e: DragEvent) => {
        e.preventDefault();
        this.dispatch(showDropTarget());
    };

    readonly dragLeaveHandler = (e: DragEvent) => {
        e.preventDefault();
        this.dispatch(hideDropTarget());
    };

    readonly dragOverHandler = (e: DragEvent) => {
        e.preventDefault();
    };

    readonly dropHandler = (e: DragEvent) => {
        e.preventDefault();

        const fileItems = getFileItemsFromFileList(e.dataTransfer.files);
        this.dispatch(hideDropTarget());
        this.dispatch(addFilesViaDrop({fileItems}));
    };

    constructor(
        protected readonly store: Store<FileUploadState>,
        private readonly elementRef: ElementRef
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

    onFileSelected(e) {
        const fileItems = getFileItemsFromFileList(e.target.files);
        this.dispatch(addFilesViaDrop({fileItems}));
    }

}
