import { Directive } from "@angular/core";
import { DgpDropzoneBase } from "../shared/dropzone-base";


// TODO: Add optional effect when dragging is started for this
// TODO: Add dgp-dropzone component that can be used as alternative to this


@Directive({
    selector: "[dgpDropzone]",
})
export class DgpDropzoneDirective<TModel> extends DgpDropzoneBase<TModel> {

}

