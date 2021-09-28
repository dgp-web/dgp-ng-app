import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

import * as d3 from "d3";
import { AxisScales } from "../../shared/models";

@Directive({selector: "[dgpChartLeftAxis]"})
export class DgpChartLeftAxisDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            d3.select(this.elementRef.nativeElement).call(d3.axisLeft(this.scales.yAxis));
        }

    }

}
