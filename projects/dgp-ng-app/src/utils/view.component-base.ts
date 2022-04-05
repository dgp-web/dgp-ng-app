import { Directive, Input } from "@angular/core";
import { observeInput$ } from "./observe-input";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpViewComponentBase<TModel> {

    @Input()
    disabled: boolean;

    protected modelValue: TModel = null;
    readonly model$ = observeInput$(this, "model");

    constructor() {
        /**
         * Ensure the initial model value is correctly derived
         */
        this.model = this.modelValue;
    }

    @Input()
    model: TModel;

}
