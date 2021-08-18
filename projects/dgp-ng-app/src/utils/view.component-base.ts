import {Directive, Input} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {isEqual} from "lodash";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpViewComponentBase<TModel> {

    protected modelValue: TModel = null;
    readonly model$ = new BehaviorSubject<TModel>(this.modelValue);

    @Input()
    get model(): TModel {
        return this.modelValue;
    }

    set model(value: TModel) {

        if (isEqual(value, this.modelValue)) return;

        this.modelValue = value;
        this.model$.next(value);
    }

}
