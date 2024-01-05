import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FileItemListModel } from "../../models";
import { DgpContainer } from "../../../utils/container.component-base";
import { FileUploadState } from "../../../file-upload/models";

@Component({
    selector: "dgp-file-item-list",
    template: `
        <mat-nav-list style="overflow: auto;">

            <h3 mat-subheader>
                Files
                <dgp-spacer></dgp-spacer>
                <dgp-remove-current-file-item-action></dgp-remove-current-file-item-action>
                <dgp-download-current-file-item></dgp-download-current-file-item>
            </h3>

            <ng-container *ngFor="let directory of model.directories">

                <dgp-file-item-list-item
                    *ngFor="let fileItemId of directory.fileItemIds"
                    [model]="model.fileItemKVS[fileItemId]"></dgp-file-item-list-item>

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

        h3 {
            display: flex;
            align-items: center;
            border-bottom: 1px solid gray;
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

