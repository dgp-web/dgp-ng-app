import { Directive, HostBinding, HostListener, Input } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { selectActionContext } from "../actions/select-action-context.action";
import { deselectActionContext } from "../actions/deselect-action-context.action";

@Directive({
    selector: "[dgpActionContext]"
})
export class DgpActionContextDirective extends DgpContainer {

    @HostBinding("tabindex")
    readonly tabindex = 0;

    @Input()
    contextKey: string;

    @HostListener("focus")
    focus() {
        this.dispatch(selectActionContext({
            selectedContextKey: this.contextKey
        }));
    }

    @HostListener("blur")
    blur() {
        this.dispatch(deselectActionContext());
    }

}
