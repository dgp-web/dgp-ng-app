import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FileItem, FileItemListModel } from "../../models";
import { getFileItemSizeLabel } from "../../functions";
import { DgpContainer } from "../../../utils/container.component-base";
import { FileUploadState } from "../../../file-upload/models";

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
                    <dgp-download-current-file-item></dgp-download-current-file-item>
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

    @Input()
    model: FileItemListModel;

    getFileItemSize(fileItem: FileItem) {
        return getFileItemSizeLabel(fileItem.size);
    }

}

