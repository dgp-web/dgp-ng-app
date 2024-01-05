import { Component } from "@angular/core";
import { FileItem } from "../../models";
import { getFileItemSizeLabel } from "../../functions";
import { DgpView } from "../../../utils/view";

@Component({
    selector: "dgp-file-item-list-item",
    template: `

        <a mat-list-item
           dgpActionContext
           actionContextType="fileItem"
           [actionContextValue]="model">
            <mat-icon matListItemIcon>insert_drive_file</mat-icon>
            <div matListItemTitle>{{ model.fileName }} ({{ model.extension }})</div>
            <div matListItemLine>
                {{ getFileItemSize() }}
            </div>
            <div matListItemLine>
                {{ model.creationDate | date:'hh:mm, dd MMMM yyyy' }}
            </div>

        </a>
    `,
    styles: [`
        :host {
            border: 1px solid transparent;
            display: flex;
            flex-direction: column;
        }
    `]
})
export class FileItemListItemComponent extends DgpView<FileItem> {

    getFileItemSize() {
        return getFileItemSizeLabel(this.model.size);
    }

}
