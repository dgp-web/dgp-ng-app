import { Directive, Input } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { isEqual } from "lodash";
import { Immutable } from "dgp-data-modeling";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpViewComponentBase<TModel> {

    protected modelValue: Immutable<TModel> = null;
    readonly model$ = new BehaviorSubject<Immutable<TModel>>(this.modelValue);

    @Input()
    get model(): Immutable<TModel> {
        return this.modelValue;
    }

    set model(value: Immutable<TModel>) {

        if (isEqual(value, this.modelValue)) return;

        this.modelValue = value;
        this.model$.next(value);
    }

}
