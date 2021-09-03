import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import { DgpView } from "dgp-ng-app";

@Directive({selector: "[dgpDraggable]"})
export class DgpDraggableDirective extends DgpView<any> implements AfterViewInit, OnChanges {

    @HostBinding("draggable")
    @HostBinding("class.--draggable") // TODO: Looks redundant
    draggable = true;

    @Input()
    disabled: boolean;

    constructor(
        private readonly cd: ChangeDetectorRef,
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.disabled) {
            this.draggable = !this.disabled;
        }
    }

    readonly dragStartHandler = (e: DragEvent) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(this.model));
    };

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("dragstart", this.dragStartHandler);
    }

}

