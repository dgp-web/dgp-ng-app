import { AfterViewInit, Directive, ElementRef, Inject, Renderer2 } from "@angular/core";
import { SVGPattern } from "../models";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Directive()
export abstract class SVGPatternBaseDirective implements AfterViewInit {

    protected readonly model: SVGPattern;

    constructor(protected readonly elementRef: ElementRef<SVGPatternElement>,
                protected readonly renderer: Renderer2,
                @Inject(ID_PREFIX)
                protected readonly idPrefix: string) {
    }

    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.elementRef.nativeElement, "id", this.idPrefix + "." + this.model.svgPatternId);

        this.renderer.setAttribute(this.elementRef.nativeElement, "x", "0");
        this.renderer.setAttribute(this.elementRef.nativeElement, "y", "0");
        this.renderer.setAttribute(this.elementRef.nativeElement, "patternUnits", "userSpaceOnUse");

        this.elementRef.nativeElement.innerHTML = "";
        this.render();
    }

    abstract render(): void;

}
