import { Component, ChangeDetectionStrategy } from "@angular/core";
import { DocumentCreationModel } from "../models";
import { DgpModelEditorComponentBase } from "../../utils/model-editor.component-base";

@Component({
    selector: "dgp-add-document-dialog",
    template: `
        <h2 mat-dialog-title>
            Add document
        </h2>

        <mat-dialog-content>

            <mat-form-field>
                <mat-label>Label</mat-label>
                <input #labelInput
                       matInput
                       [ngModel]="model.label"
                       (ngModelChange)="updateLabel($event)"
                       maxlength="64">
                <mat-hint align="end">
                    {{ labelInput.value ? labelInput.value.length : 0 }} / 64
                </mat-hint>
            </mat-form-field>

        </mat-dialog-content>

        <mat-dialog-actions>

            <button mat-raised-button
                    [matDialogClose]="null">
                <mat-icon style="margin-right: 4px;">close</mat-icon>
                Cancel
            </button>

            <button mat-raised-button
                    color="primary"
                    [disabled]="!model.label"
                    [matDialogClose]="model">
                <mat-icon style="margin-right: 4px;">check</mat-icon>
                Add
            </button>
        </mat-dialog-actions>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDocumentDialogComponent extends DgpModelEditorComponentBase<DocumentCreationModel> {

    protected modelValue = {label: null, documentTemplateId: "my-document-template"};

    updateLabel(label: string) {
        this.updateModel({label});
    }
}
