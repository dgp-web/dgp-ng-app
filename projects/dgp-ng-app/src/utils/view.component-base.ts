import { Directive, Input } from "@angular/core";
import { observeAttribute$ } from "./observe-input/observe-attribute$.function";
import { DgpDisabledBase } from "./dgp-disabled-base.directive";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpViewComponentBase<TModel> extends DgpDisabledBase {

    protected modelValue: TModel = null;

    readonly model$ = observeAttribute$(this as DgpViewComponentBase<TModel>, "model");

    constructor() {
        super();
        /**
         * Ensure the initial model value is correctly derived
         */
        this.model = this.modelValue;
    }

    @Input()
    model: TModel;

}
