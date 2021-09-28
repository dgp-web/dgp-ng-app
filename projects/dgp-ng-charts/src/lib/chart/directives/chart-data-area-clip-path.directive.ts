import { Directive, ElementRef, Inject, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { AxisScales } from "../../shared/models";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Directive({selector: "[dgpChartDataAreaClipPath]"})
export class DgpChartDataAreaClipPathDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2,
                @Inject(ID_PREFIX)
                protected readonly idPrefix: string) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.scales) {
            this.renderer.setAttribute(this.elementRef.nativeElement, "id", this.idPrefix + ".dataAreaClipPath");
            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", "transparent");

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect") as SVGRectElement;

            this.renderer.setAttribute(rect, "x", "0");
            this.renderer.setAttribute(rect, "y", "0");
            this.renderer.setAttribute(rect, "width", this.scales.dataAreaWidth.toString());
            this.renderer.setAttribute(rect, "height", this.scales.dataAreaHeight.toString());

            this.elementRef.nativeElement.appendChild(rect);
        }

    }
}
