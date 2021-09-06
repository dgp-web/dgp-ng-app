import { Directive } from "@angular/core";
import { DgpDropzoneBase } from "../shared/dropzone-base";

@Directive({
    selector: "[dgpDropzone]",
})
export class DgpDropzoneDirective<TModel> extends DgpDropzoneBase<TModel> {

}

