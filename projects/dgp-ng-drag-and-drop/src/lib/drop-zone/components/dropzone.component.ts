import { Component } from "@angular/core";
import { DgpDropzoneDirectiveBase } from "../shared/dropzone.directive-base";

@Component({
    selector: "dgp-dropzone",
    template: `
        <ng-content></ng-content>
        
        @if (isModelDragged$ | async) {
          <ng-content select="[dgp-drop-indicator]"></ng-content>
        }
        `,
    standalone: false
})
export class DgpDropzoneComponent<TModel> extends DgpDropzoneDirectiveBase<TModel> {

}
