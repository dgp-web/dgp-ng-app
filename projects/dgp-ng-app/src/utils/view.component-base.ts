import { Directive, Input } from "@angular/core";
import { observeAttribute$ } from "./observe-input/observe-attribute$.function";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpViewComponentBase<TModel> {

    @Input()
    disabled: boolean;

    protected modelValue: TModel = null;

    readonly model$ = observeAttribute$(this as DgpViewComponentBase<TModel>, "model");

    constructor() {
        /**
         * Ensure the initial model value is correctly derived
         */
        this.model = this.modelValue;
    }

    @Input()
    model: TModel;

}
