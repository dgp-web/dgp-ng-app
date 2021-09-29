import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BoxPlotScales } from "../models";
import * as d3 from "d3";

@Directive({selector: "[dgpBoxPlotLeftAxis]"})
export class BoxPlotLeftAxisDirective implements OnChanges {

    @Input()
    scales: BoxPlotScales;

    constructor(private readonly elementRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            d3.select(this.elementRef.nativeElement).call(d3.axisLeft(this.scales.yAxisScale));
        }

    }

}
