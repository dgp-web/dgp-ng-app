import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { ModelDragInfo } from "../../models/model-drag-info.model";
import { WithDragContext } from "../../models";
import { Mutable } from "data-modeling";


// TODO: Add effect when a dragged item is placed over this
// TODO: Wire up with drop zone
// TODO: Add optional effect when dragging is started for this
// TODO: Add dgp-dropzone component that can be used as alternative to this
// TODO: Add ModelDragInfo<TModel { readonly dragContext: string; readonly model: TModel; }

@Directive({
    selector: "[dgpDropzone]",
})
export class DgpDropzoneDirective<TModel> implements AfterViewInit, Mutable<WithDragContext> {

    @Input()
    dragContext: string;

    @Output()
    readonly modelDropped = new EventEmitter<TModel>();

    constructor(
        private readonly elementRef: ElementRef,
    ) {
    }

    readonly dragOver = (e) => {

        // TODO: Parse data transfer and check context

        e.preventDefault();
    };

    readonly drop = (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const stringifiedData = e.dataTransfer.getData("text/plain");
        const data = JSON.parse(stringifiedData) as ModelDragInfo<any>;

        if (data.dragContext !== this.dragContext) return;

        const model = data.model;
        this.modelDropped.emit(model);
    };


    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("dragover", this.dragOver);
        this.elementRef.nativeElement.addEventListener("drop", this.drop);
    }

}

