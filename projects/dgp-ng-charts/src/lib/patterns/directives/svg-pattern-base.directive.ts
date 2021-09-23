import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive()
export abstract class SVGPatternBaseDirective implements AfterViewInit {

    constructor(protected readonly elementRef: ElementRef<SVGPatternElement>,
                protected readonly renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.elementRef.nativeElement, "x", "0");
        this.renderer.setAttribute(this.elementRef.nativeElement, "y", "0");
        this.renderer.setAttribute(this.elementRef.nativeElement, "patternUnits", "userSpaceOnUse");

        this.render();
    }

    abstract render(): void;

}
