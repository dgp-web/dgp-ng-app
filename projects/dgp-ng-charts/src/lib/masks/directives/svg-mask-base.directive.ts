import { AfterViewInit, Directive, ElementRef, Inject, Renderer2 } from "@angular/core";
import { SVGMask } from "../models";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Directive()
export abstract class SVGMaskBaseDirective implements AfterViewInit {

    protected readonly model: SVGMask;

    constructor(protected readonly elementRef: ElementRef<SVGMaskElement>,
                protected readonly renderer: Renderer2,
                @Inject(ID_PREFIX)
                protected readonly idPrefix: string) {
    }

    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.elementRef.nativeElement, "id", this.idPrefix + "." + this.model.svgMaskId);
        this.renderer.setAttribute(this.elementRef.nativeElement, "maskUnits", "objectBoundingBox");
        this.elementRef.nativeElement.innerHTML = "";

        this.render();
    }

    render(): void {
        this.model.svgPatternIds.forEach(patternId => {

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;

            this.renderer.setAttribute(rect, "x", "0");
            this.renderer.setAttribute(rect, "y", "0");
            this.renderer.setAttribute(rect, "width", "100%");
            this.renderer.setAttribute(rect, "height", "100%");
            this.renderer.setAttribute(rect, "fill", "url(#" + this.idPrefix + "." + patternId + ")");

            this.elementRef.nativeElement.appendChild(rect);
        });
    }

}
