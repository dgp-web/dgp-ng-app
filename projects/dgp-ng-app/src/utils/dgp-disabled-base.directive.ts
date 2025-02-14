import { Directive, Input } from "@angular/core";
import { observeAttribute$ } from "./observe-input";

@Directive()
export abstract class DgpDisabledBase {

    readonly disabled$ = observeAttribute$(this as DgpDisabledBase, "disabled");

    @Input()
    disabled = false;

}
