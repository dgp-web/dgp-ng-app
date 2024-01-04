import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FileItemListModel } from "../../models";
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

                <div *ngFor="let directory of model.directories"
                     style="overflow: auto;">

                    <dgp-file-item-list-item
                            *ngFor="let fileItemId of directory.fileItemIds"
                            [model]="model.fileItemKVS[fileItemId]"></dgp-file-item-list-item>

                </div>

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

}

