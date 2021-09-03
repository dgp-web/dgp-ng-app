import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from "@angular/core";

@Directive({
    selector: "[dgpDropzone]",
})
export class DgpDropzoneDirective implements AfterViewInit {

    @Output()
    readonly modelDropped = new EventEmitter<any>();

    constructor(
        private readonly elementRef: ElementRef,
    ) {
    }

    readonly dragOver = (e) => {
        e.preventDefault();
    };

    readonly drop = (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const stringifiedData = e.dataTransfer.getData("text/plain");
        const data = JSON.parse(stringifiedData);

        this.modelDropped.emit(data);
    };


    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("dragover", this.dragOver);
        this.elementRef.nativeElement.addEventListener("drop", this.drop);
    }


}

