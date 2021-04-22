import { Directive } from "@angular/core";
import { DgpViewComponentBase } from "./view.component-base";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DgpView<TModel> extends DgpViewComponentBase<TModel> {

}
