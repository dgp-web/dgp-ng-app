import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { BoxPlotScales } from "../models";
import * as d3 from "d3";

@Directive({selector: "[dgpBoxPlotBottomAxis]"})
export class BoxPlotBottomAxisDirective implements OnChanges {

    @Input()
    scales: BoxPlotScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            this.renderer.setAttribute(
                this.elementRef.nativeElement,
                "transform",
                "translate(0," + this.scales.yAxis.range()[1] + ")"
            );
            this.elementRef.nativeElement.style.transform = "translate(0," + this.scales.yAxis.range()[1] + ")";
            d3.select(this.elementRef.nativeElement).call(d3.axisBottom(this.scales.xAxis));
        }

    }

}
