import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

import * as d3 from "d3";
import { AxisScales } from "../../shared/models";

@Directive({selector: "[dgpChartYAxisGridLines]"})
export class DgpChartYAxisGridLinesDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef<SVGGElement>) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            this.elementRef.nativeElement.innerHTML = "";

            const innerTickSize = this.scales.xAxis.scale().range()[1];

            const yGridDummyAxis = this.scales.yAxis
                .tickFormat((domainValue, index) => null)
                .tickSizeInner(-innerTickSize);

            d3.select(this.elementRef.nativeElement).call(yGridDummyAxis);


        }

    }

}
