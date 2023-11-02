import { Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../../file-upload/models";
import { firstAsPromise } from "../../utils/first-as-promise";
import { getSelectedFileItem } from "../../file-upload/selectors";
import { removeFile } from "../../file-upload/actions";
import { createSelector } from "@ngrx/store";
import { notNullOrUndefined } from "../../utils/null-checking.functions";

export const canRemoveCurrentFileItem = createSelector(
    getSelectedFileItem, x => notNullOrUndefined(x)
);

@Component({
    selector: "dgp-remove-current-file-item-action",
    template: `
        <button mat-icon-button
                class="--compact"
                (click)="removeCurrentFileItem()"
                [disabled]="canRemoveCurrentFileItem$ | async | negate"
                matTooltip="Remove selected file"
                dgpActionShortcut
                [requireCtrl]="false"
                [requireAlt]="false"
                shortcutKey="Delete">
            <mat-icon>delete</mat-icon>
        </button>
    `
})
export class RemoveCurrentFileItemActionComponent extends DgpContainer<FileUploadState> {

    readonly canRemoveCurrentFileItem$ = this.select(canRemoveCurrentFileItem);

    async removeCurrentFileItem() {
        const fileItem = await firstAsPromise(this.select(getSelectedFileItem));
        this.dispatch(removeFile({fileItem}));
    }

}
