import { Directive } from "@angular/core";
import { SVGPatternBaseDirective } from "./svg-pattern-base.directive";
import { checkerboardPattern } from "../constants";

@Directive({selector: "[dgpCheckerboardPattern]"})
export class CheckerboardPatternDirective extends SVGPatternBaseDirective {

    model = checkerboardPattern;

    render(): void {

        this.renderer.setAttribute(this.elementRef.nativeElement, "width", "15");
        this.renderer.setAttribute(this.elementRef.nativeElement, "height", "15");

        const rect01 = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;

        this.renderer.setAttribute(rect01, "x", "0");
        this.renderer.setAttribute(rect01, "y", "0");
        this.renderer.setAttribute(rect01, "width", "7");
        this.renderer.setAttribute(rect01, "height", "7");
        this.renderer.setAttribute(rect01, "fill", "white");

        this.elementRef.nativeElement.appendChild(rect01);

        const rect02 = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;

        this.renderer.setAttribute(rect02, "x", "7");
        this.renderer.setAttribute(rect02, "y", "7");
        this.renderer.setAttribute(rect02, "width", "7");
        this.renderer.setAttribute(rect02, "height", "7");
        this.renderer.setAttribute(rect02, "fill", "white");

        this.elementRef.nativeElement.appendChild(rect02);

    }


}
