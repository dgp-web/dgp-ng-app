import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({selector: "[dgpVerticalLinesPattern]"})
export class VerticalLinesPatternDirective implements AfterViewInit {

    constructor(private readonly elementRef: ElementRef<SVGPatternElement>,
                private readonly renderer: Renderer2) {
    }

    ngAfterViewInit(): void {

        this.renderer.setAttribute(this.elementRef.nativeElement, "x", "0");
        this.renderer.setAttribute(this.elementRef.nativeElement, "y", "0");
        this.renderer.setAttribute(this.elementRef.nativeElement, "width", "4");
        this.renderer.setAttribute(this.elementRef.nativeElement, "height", "4");

        this.renderer.setAttribute(this.elementRef.nativeElement, "patternUnits", "userSpaceOnUse");
        this.renderer.setAttribute(this.elementRef.nativeElement, "id", "vertical-lines-pattern");

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;

        this.renderer.setAttribute(rect, "x", "0");
        this.renderer.setAttribute(rect, "y", "0");
        this.renderer.setAttribute(rect, "width", "1");
        this.renderer.setAttribute(rect, "height", "4");
        this.renderer.setAttribute(rect, "stroke", "white");
        this.renderer.setAttribute(rect, "stroke-width", "1");

        this.elementRef.nativeElement.appendChild(rect);

    }


}
