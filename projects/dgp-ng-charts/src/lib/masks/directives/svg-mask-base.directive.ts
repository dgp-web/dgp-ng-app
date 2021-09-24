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

    render(): void {
        this.model.svgPatternIds.forEach(patternId => {

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;

            this.renderer.setAttribute(rect, "x", "0");
            this.renderer.setAttribute(rect, "y", "0");
            this.renderer.setAttribute(rect, "width", "100%");
            this.renderer.setAttribute(rect, "height", "100%");
            this.renderer.setAttribute(rect, "fill", "url(#" + patternId + ")");

            this.elementRef.nativeElement.appendChild(rect);
        });
    }

}
