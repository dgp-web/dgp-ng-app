import { Component } from "@angular/core";
import { DgpDropzoneBase } from "../shared/dropzone-base";

@Component({
    selector: "dgp-dropzone",
    template: `
        <ng-content></ng-content>

        <ng-container *ngIf="isModelDragged$ | async">
            <ng-content select="[dgp-drop-indicator]"></ng-content>
        </ng-container>
    `
})
export class DgpDropzoneComponent<TModel> extends DgpDropzoneBase<TModel> {

}
