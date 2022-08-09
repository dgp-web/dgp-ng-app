import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { AxisScales } from "../../shared/models";

@Directive({selector: "[dgpChartDataAreaOutlineRight]"})
export class ChartDataAreaOutlineRightDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef<SVGGElement>,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {

            const x = this.scales.xAxisScale.range()[1];
            const yAxisRange = this.scales.yAxisScale.range();

            this.renderer.setAttribute(this.elementRef.nativeElement, "y1", yAxisRange[0].toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y2", yAxisRange[1].toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "x1", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "x2", x.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-dasharray", "[0, 0]");
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", "currentColor");

        }

    }

}
