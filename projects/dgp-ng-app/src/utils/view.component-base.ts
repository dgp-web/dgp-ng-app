import { Directive, Input } from "@angular/core";
import { observeProperty } from "./observe-property.function";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpViewComponentBase<TModel> {

    @Input()
    disabled: boolean;

    readonly model$ = observeProperty(this, "model");

    @Input()
    model: TModel;

}
