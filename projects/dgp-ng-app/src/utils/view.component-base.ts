import { Directive, Input } from "@angular/core";
import { observeInput$ } from "./observe-ng-input.function";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpViewComponentBase<TModel> {

    @Input()
    disabled: boolean;

    protected modelValue: TModel = null;
    readonly model$ = observeInput$(this, "model");

    constructor() {
        this.model = this.modelValue;
    }

    @Input()
    model: TModel;

}
