import { Directive, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ObservableProperty } from "./observable-property.function";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpViewComponentBase<TModel> {

    @Input()
    disabled: boolean;

    @Input()
    model: TModel;

    @ObservableProperty<DgpViewComponentBase<TModel>>("model")
    readonly model$: Observable<TModel>;

}
