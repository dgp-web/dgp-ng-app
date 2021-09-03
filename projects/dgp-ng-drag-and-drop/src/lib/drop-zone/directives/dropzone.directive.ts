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

    readonly dropHandler = (e) => {
        console.log("dropHandler");
        e.preventDefault();
    };

    readonly drop = (e) => {
        console.log("Test");

        //  console.log("Drop");
        // Stops some browsers from redirecting.
        e.stopPropagation();
        // prevent default action (open as link for some elements)
        e.preventDefault();
        // move dragged elem to the selected drop target

        const data = e.dataTransfer.getData("text/plain");

        console.log(data);

    };


    ngAfterViewInit(): void {
        this.elementRef.nativeElement.addEventListener("drop", this.dropHandler);
        // this.elementRef.nativeElement.addEventListener("dragend", this.dragEndHandler);
        this.elementRef.nativeElement.addEventListener("dragover", this.dragOver);
        this.elementRef.nativeElement.addEventListener("drop", this.drop);
    }


}

