import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BoxPlotScales } from "../models";
import * as d3 from "d3";

@Directive({selector: "[dgpBoxPlotAxisBottom]"})
export class BoxPlotBottomAxisDirective implements AfterViewInit, OnChanges {

    @Input()
    scales: BoxPlotScales;

    constructor(private readonly elementRef: ElementRef) {
        elementRef.nativeElement.style.backgroundColor = "yellow";
    }

    ngAfterViewInit(): void {
        console.log("Test");
        if (this.scales) {
            console.log("Test");
            this.elementRef.nativeElement.transform = "translate(0," + this.scales.yAxis.range()[1] + ")";
            d3.select(this.elementRef.nativeElement).call(d3.axisBottom(this.scales.xAxis));
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log("Test");
        if (changes.scales) {
            console.log("Test");
            this.elementRef.nativeElement.transform.transform = "translate(0," + this.scales.yAxis.range()[1] + ")";
            d3.select(this.elementRef.nativeElement).call(d3.axisBottom(this.scales.xAxis));
        }

    }

}
