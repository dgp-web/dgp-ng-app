import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { AxisScales } from "../../shared/models";

@Directive({selector: "[dgpChartDataAreaOutlineTop]"})
export class ChartDataAreaOutlineTopDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef<SVGGElement>,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {

            const y = this.scales.yAxisScale.range()[0];
            const xAxisRange = this.scales.xAxisScale.range();

            this.renderer.setAttribute(this.elementRef.nativeElement, "x1", xAxisRange[0].toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "x2", xAxisRange[1].toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y1", y.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y2", y.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-dasharray", "[0, 0]");
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", "currentColor");

        }

    }

}
