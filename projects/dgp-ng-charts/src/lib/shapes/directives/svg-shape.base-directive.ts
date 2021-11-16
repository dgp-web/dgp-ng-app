import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

@Directive()
export abstract class SVGShapeBaseDirective implements AfterViewInit, OnChanges {

    @Input()
    width = 12;

    @Input()
    height = this.width;

    constructor(protected readonly elementRef: ElementRef,
                protected readonly renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.setAllAttributes();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.width || changes.height) this.setAllAttributes();
    }

    setAllAttributes(): void {
        this.setCommonAttributes();
        this.setAttributes();
    }

    setCommonAttributes(): void {
        this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString());
        this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString());
    }

    abstract setAttributes(): void;

}
