import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Directory, FileItem } from "../models";
import { getFileItemSizeLabel } from "../functions";
import { KVS } from "entity-store";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../../file-upload/models";
import { getSelectedFileItem } from "../../file-upload/selectors";
import { map } from "rxjs/operators";
import { selectFileItem } from "../select-file-item.action";

export interface FileItemListModel {
    readonly fileItemKVS: KVS<FileItem>;
    readonly directories: ReadonlyArray<Directory>;
}

@Component({
    selector: "dgp-file-item-list",
    template: `
        <mat-nav-list style="overflow: auto;">
            <ng-container *ngFor="let directory of model.directories">
                <a *ngFor="let fileItemId of directory.fileItemIds"
                   mat-list-item
                   (click)="selectFileItem(fileItemId)"
                   [matTooltip]="model.fileItemKVS[fileItemId].fileName"
                   matTooltipShowDelay="500"
                   class="dgp-list-item"
                   [class.--selected]="isSelected$(fileItemId) | async">
                    <mat-icon matListIcon>
                        insert_drive_file
                    </mat-icon>
                    <div matLine
                         style="display: flex; align-items: center;">

                        <div style="flex-grow: 1; display: flex; flex-direction: column; overflow: hidden;">

                            <div style="flex-grow: 1; display: flex;">
                                {{ model.fileItemKVS[fileItemId].fileName }}
                                <dgp-spacer></dgp-spacer>
                                <small>{{ model.fileItemKVS[fileItemId].extension }}</small>
                            </div>

                            <div style="display: flex;">
                                <small>{{ model.fileItemKVS[fileItemId].creationDate | date:'hh:mm, dd MMMM yyyy' }}</small>
                                <dgp-spacer></dgp-spacer>
                                <small>{{ getFileItemSize(model.fileItemKVS[fileItemId]) }}</small>
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
                                    (click)="removeFileItem(model.fileItemKVS[fileItemId])"
                                    [disabled]="disabled">
                                <mat-icon>delete</mat-icon>
                                Remove
                            </button>
                            <button mat-menu-item
                                    (click)="downloadFileItem(model.fileItemKVS[fileItemId])">
                                <mat-icon>file_download</mat-icon>
                                Download
                            </button>
                        </mat-menu>

                    </div>
                </a>

            </ng-container>
        </mat-nav-list>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileItemListComponent extends DgpContainer<FileUploadState> {

    @Input()
    disabled: boolean;

    @Output()
    readonly fileItemRemoved = new EventEmitter<FileItem>();

    @Output()
    readonly fileItemDownloaded = new EventEmitter<FileItem>();

    @Input()
    model: FileItemListModel;

    getFileItemSize(fileItem: FileItem) {
        return getFileItemSizeLabel(fileItem.size);
    }

    removeFileItem(fileItem: FileItem) {
        if (this.disabled) return;

        this.fileItemRemoved.emit(fileItem);
    }

    downloadFileItem(fileItem: FileItem) {
        this.fileItemDownloaded.emit(fileItem);
    }

    selectFileItem(fileItemId: string) {
        this.dispatch(selectFileItem({fileItemId}));
    }

    isSelected$(fileItemId: string) {
        return this.select(getSelectedFileItem).pipe(
            map(x => x?.fileItemId === fileItemId)
        );
    }
}

