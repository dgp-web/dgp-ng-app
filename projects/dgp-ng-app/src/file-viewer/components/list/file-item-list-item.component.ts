import { Component } from "@angular/core";
import { FileItem } from "../../models";
import { getFileItemSizeLabel } from "../../functions";
import { DgpView } from "../../../utils/view";

@Component({
    selector: "dgp-file-item-list-item",
    template: `
        <dgp-inspector-item
            label="{{model.fileName}} ({{model.extension}})"
            matIconName="insert_drive_file"
            dgpActionContext
            actionContextType="fileItem"
            [actionContextValue]="model"
            description="{{ model.creationDate | date:'hh:mm, dd MMMM yyyy' }}">

            <dgp-spacer></dgp-spacer>
            <small>
                {{ getFileItemSize() }}
            </small>

        </dgp-inspector-item>
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
