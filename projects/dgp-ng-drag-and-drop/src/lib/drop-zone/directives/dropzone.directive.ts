import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output
} from "@angular/core";
import { ModelDragInfo } from "../../models/model-drag-info.model";
import { WithDragContext } from "../../models";
import { Mutable } from "data-modeling";


// TODO: Add effect when a dragged item is placed over this
// TODO: Add optional effect when dragging is started for this
// TODO: Add dgp-dropzone component that can be used as alternative to this

@Directive({
    selector: "[dgpDropzone]",
})
export class DgpDropzoneDirective<TModel> implements AfterViewInit, Mutable<WithDragContext> {

    @HostBinding("class.--dgp-drag-over")
    dragover = false;

    @Input()
    dragContext: string;

    @Output()
    readonly modelDropped = new EventEmitter<TModel>();

    constructor(
        private readonly elementRef: ElementRef,
        private readonly cd: ChangeDetectorRef,
    ) {
    }

    readonly onDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    readonly onDragEnter = (e: DragEvent) => {
        const model = this.parseDragEvent(e);
        if (!model) return;

        this.activateDragOverEffect();
    };

    readonly onDragLeave = (e) => {
        const model = this.parseDragEvent(e);
        if (!model) return;

        this.deactivateDragOverEffect();
    };

    readonly drop = (e: DragEvent) => {
        e.stopPropagation();

        const model = this.parseDragEvent(e);
        if (!model) return;

        this.modelDropped.emit(model);
        this.deactivateDragOverEffect();
    };


    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("dragenter", this.onDragEnter);
        this.elementRef.nativeElement.addEventListener("dragleave", this.onDragLeave);
        this.elementRef.nativeElement.addEventListener("dragover", this.onDragOver);
        this.elementRef.nativeElement.addEventListener("drop", this.drop);
    }

    private parseDragEvent(e: DragEvent): TModel {
        e.preventDefault();

        const stringifiedData = e.dataTransfer.getData("text/plain");
        const data = JSON.parse(stringifiedData) as ModelDragInfo<TModel>;

        if (data?.dragContext !== this.dragContext) return null;

        return data.model;

    }

    private activateDragOverEffect() {
        this.dragover = true;
        this.cd.markForCheck();
    }

    private deactivateDragOverEffect() {
        this.dragover = false;
        this.cd.markForCheck();
    }

}

