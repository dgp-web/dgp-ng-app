import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FileItem } from "../models";
import { getFileItemSizeLabel } from "../functions";

@Component({
    selector: "dgp-file-item-list",
    template: `
        <mat-nav-list style="overflow: auto;">
            <a *ngFor="let fileItem of fileItems"
               mat-list-item
               [routerLink]="[]"
               routerLinkActive="dgp-list-item --selected"
               [queryParams]="{ fileItemId: fileItem.fileItemId }"
               [matTooltip]="fileItem.fileName"
               matTooltipShowDelay="500"
               (keydown.delete)="fileItemRemoved.emit(fileItem)">
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
                                (click)="fileItemRemoved.emit(fileItem)">Remove
                        </button>
                    </mat-menu>

                </div>
            </a>
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

    @Output()
    readonly fileItemRemoved = new EventEmitter<FileItem>();

    @Input()
    fileItems: ReadonlyArray<FileItem>;

    getFileItemSize(fileItem: FileItem) {
        return getFileItemSizeLabel(fileItem.size);
    }

}
