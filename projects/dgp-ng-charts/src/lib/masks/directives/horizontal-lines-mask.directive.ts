import { Directive } from "@angular/core";
import { horizontalLinesMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({selector: "[dgpHorizontalLinesMask]"})
export class HorizontalLinesMaskDirective extends SVGMaskBaseDirective {

    model = horizontalLinesMask;

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
