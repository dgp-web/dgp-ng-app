import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FileItem, FileItemListModel } from "../models";
import { getFileItemSizeLabel } from "../functions";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../../file-upload/models";
import { firstAsPromise } from "../../utils/first-as-promise";
import { getSelectedFileItem } from "../../file-upload/selectors";

@Component({
    selector: "dgp-file-item-list",
    template: `
        <dgp-inspector style="overflow: auto;"
                       [responsive]="false"
                       [showFieldIcons]="true">
            <dgp-inspector-section [expandable]="false"
                                   label="Files">
                <ng-container actions>
                    <dgp-remove-current-file-item-action></dgp-remove-current-file-item-action>

                    <button mat-icon-button
                            class="--compact"
                            (click)="downloadCurrentFileItem()"
                            matTooltip="Download selected file"
                            dgpActionShortcut
                            shortcutKey="d">
                        <mat-icon>file_download</mat-icon>
                    </button>
                </ng-container>

                <ng-container *ngFor="let directory of model.directories">
                    <dgp-inspector-item
                            *ngFor="let fileItemId of directory.fileItemIds"
                            label="{{model.fileItemKVS[fileItemId].fileName}} ({{model.fileItemKVS[fileItemId].extension}})"
                            matIconName="insert_drive_file"
                            dgpActionContext
                            actionContextType="fileItem"
                            [actionContextValue]="model.fileItemKVS[fileItemId]"
                            description="{{ model.fileItemKVS[fileItemId].creationDate | date:'hh:mm, dd MMMM yyyy' }}">

                        <dgp-spacer></dgp-spacer>
                        <small>
                            {{ getFileItemSize(model.fileItemKVS[fileItemId]) }}
                        </small>

                    </dgp-inspector-item>

                </ng-container>

            </dgp-inspector-section>
        </dgp-inspector>
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

    async downloadCurrentFileItem() {
        const fileItem = await firstAsPromise(this.select(getSelectedFileItem));
        this.downloadFileItem(fileItem);
    }
}

