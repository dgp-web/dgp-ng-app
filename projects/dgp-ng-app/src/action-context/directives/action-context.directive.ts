import { Directive, HostBinding, HostListener, Input, OnDestroy } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { selectActionContext } from "../actions/select-action-context.action";
import { deselectActionContext } from "../actions/deselect-action-context.action";

@Directive({
    selector: "[dgpActionContext]"
})
export class DgpActionContextDirective extends DgpContainer implements OnDestroy {

    @HostBinding("tabindex")
    readonly tabindex = 0;

    @Input()
    actionContextKey: string;

    @HostListener("focus")
    focus() {
        this.dispatch(selectActionContext({
            selectedActionContextKey: this.actionContextKey
        }));
    }

    @HostListener("blur")
    blur() {
        this.dispatch(deselectActionContext({}));
    }

    ngOnDestroy(): void {
        this.dispatch(deselectActionContext({
            selectedActionContextKey: this.actionContextKey
        }));
    }

}
