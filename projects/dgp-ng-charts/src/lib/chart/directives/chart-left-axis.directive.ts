import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

import * as d3 from "d3";
import { AxisScales } from "../../shared/models";


@Directive({selector: "[dgpChartLeftAxis]"})
export class DgpChartLeftAxisDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef<SVGGElement>) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            this.elementRef.nativeElement.innerHTML = "";
            d3.select(this.elementRef.nativeElement).call(this.scales.yAxis);
        }

    }

}
