import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import * as d3 from "d3";
import { AxisScales } from "../../shared/models";

@Directive({selector: "[dgpChartXAxisGridLines]"})
export class DgpChartXAxisGridLinesDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef<SVGGElement>,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            this.elementRef.nativeElement.innerHTML = "";

            this.renderer.setAttribute(
                this.elementRef.nativeElement,
                "transform",
                "translate(0," + this.scales.yAxisScale.range()[1] + ")"
            );
            this.elementRef.nativeElement.style.transform = "translate(0," + this.scales.yAxisScale.range()[1] + ")";

            const innerTickSize = this.scales.yAxis.scale().range()[1];

            const xGridDummyAxis = this.scales.xAxis
                .tickFormat((domainValue, index) => null)
                .tickSizeInner(-innerTickSize);

            d3.select(this.elementRef.nativeElement).call(xGridDummyAxis);
        }

    }

}
