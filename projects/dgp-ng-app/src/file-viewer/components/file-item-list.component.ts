import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Directory, FileItem } from "../models";
import { getFileItemSizeLabel } from "../functions";
import { KVS } from "entity-store";

export interface FileItemListModel {
    readonly fileItemKVS: KVS<FileItem>;
    readonly directories: ReadonlyArray<Directory>;
}

@Component({
    selector: "dgp-file-item-list",
    template: `
        <mat-nav-list style="overflow: auto;">
            <ng-container *ngFor="let directory of model.directories">
                <h3 mat-subheader>{{ directory.label }}</h3>

                <a *ngFor="let fileItemId of directory.fileItemIds"
                   mat-list-item
                   [routerLink]="[]"
                   routerLinkActive="dgp-list-item --selected"
                   [queryParams]="{ fileItemId: model.fileItemKVS[fileItemId].fileItemId }"
                   queryParamsHandling="merge"
                   [matTooltip]="model.fileItemKVS[fileItemId].fileName"
                   matTooltipShowDelay="500"
                   (keydown.delete)="removeFileItem(model.fileItemKVS[fileItemId])">
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
                                [matMenuTriggerFor]="overflowMenu"
                                [disabled]="disabled">

                            <mat-icon>
                                more_vert
                            </mat-icon>

                        </button>

                        <mat-menu #overflowMenu="matMenu">
                            <button mat-menu-item
                                    (click)="removeFileItem(model.fileItemKVS[fileItemId])"
                                    [disabled]="disabled">Remove
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
export class FileItemListComponent {

    @Input()
    disabled: boolean;

    @Output()
    readonly fileItemRemoved = new EventEmitter<FileItem>();

    @Input()
    model: FileItemListModel;

    getFileItemSize(fileItem: FileItem) {
        return getFileItemSizeLabel(fileItem.size);
    }

    removeFileItem(fileItem: FileItem) {
        if (this.disabled) return;

        this.fileItemRemoved.emit(fileItem);
    }

}
