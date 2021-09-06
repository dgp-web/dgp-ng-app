import { Directive } from "@angular/core";
import { DgpDropzoneBase } from "../shared/dropzone-base";


// TODO: Add optional effect when dragging is started for this


@Directive({
    selector: "[dgpDropzone]",
})
export class DgpDropzoneDirective<TModel> extends DgpDropzoneBase<TModel> {

}

