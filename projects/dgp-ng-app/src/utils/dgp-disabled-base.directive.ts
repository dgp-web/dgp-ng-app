import { Directive, Input } from "@angular/core";

@Directive()
export abstract class DgpDisabledBase {

    @Input()
    disabled = false;

}
