import { Component } from "@angular/core";
import { DgpDropzoneBase } from "../shared/dropzone-base";

@Component({
    selector: "dgp-dropzone",
    template: `
        <ng-content></ng-content>
    `
})
export class DgpDropzoneComponent<TModel> extends DgpDropzoneBase<TModel> {

}
