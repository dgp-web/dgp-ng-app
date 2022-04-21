import { Directive } from "@angular/core";
import { DgpDropzoneDirectiveBase } from "../shared/dropzone.directive-base";

@Directive({
    selector: "[dgpDropzone]",
})
export class DgpDropzoneDirective<TModel> extends DgpDropzoneDirectiveBase<TModel> {

}

