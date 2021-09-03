import { ChangeDetectorRef, Directive, HostBinding, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DgpView } from "dgp-ng-app";

@Directive({selector: "[dgpDraggable]"})
export class DgpDraggableDirective extends DgpView<any> implements OnChanges {

    @HostBinding("class.--draggable")
    draggable = true;

    @Input()
    disabled: boolean;

    constructor(
        private readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.disabled) {
            this.draggable = !this.disabled;
        }
    }

}

