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
import { Mutable } from "data-modeling";
import { DgpView } from "dgp-ng-app";
import { WithDragContext } from "../../models";
import { ModelDragInfo } from "../../models/model-drag-info.model";

@Directive({selector: "[dgpDraggable]"})
export class DgpDraggableDirective<TModel> extends DgpView<TModel> implements AfterViewInit, OnChanges, Mutable<WithDragContext> {

    @Input()
    dragContext: string;

    @HostBinding("draggable")
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
        const modelDragInfo: ModelDragInfo<TModel> = {model: this.model, dragContext: this.dragContext};
        e.dataTransfer.setData("text/plain", JSON.stringify(modelDragInfo));
    };

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("dragstart", this.dragStartHandler);
    }

}

