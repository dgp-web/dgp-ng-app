import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";
import { SVGMask } from "../models";

@Directive()
export abstract class SVGMaskBaseDirective implements AfterViewInit {

    protected readonly model: SVGMask;

    constructor(protected readonly elementRef: ElementRef<SVGMaskElement>,
                protected readonly renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.elementRef.nativeElement, "id", this.model.svgMaskId);
        this.renderer.setAttribute(this.elementRef.nativeElement, "maskUnits", "objectBoundingBox");

        this.render();
    }

    abstract render(): void;

}
