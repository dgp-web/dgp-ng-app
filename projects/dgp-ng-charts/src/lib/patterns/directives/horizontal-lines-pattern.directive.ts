import { Directive } from "@angular/core";
import { SVGPatternBaseDirective } from "./svg-pattern-base.directive";
import { horizontalLinesPattern } from "../constants";

@Directive({selector: "[dgpHorizontalLinesPattern]"})
export class HorizontalLinesPatternDirective extends SVGPatternBaseDirective {

    model = horizontalLinesPattern;

    render(): void {

        this.renderer.setAttribute(this.elementRef.nativeElement, "width", "4");
        this.renderer.setAttribute(this.elementRef.nativeElement, "height", "4");

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;

        this.renderer.setAttribute(rect, "x", "0");
        this.renderer.setAttribute(rect, "y", "0");
        this.renderer.setAttribute(rect, "width", "4");
        this.renderer.setAttribute(rect, "height", "1");
        this.renderer.setAttribute(rect, "stroke", "white");
        this.renderer.setAttribute(rect, "stroke-width", "1");

        this.elementRef.nativeElement.appendChild(rect);

    }


}
