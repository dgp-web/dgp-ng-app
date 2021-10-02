import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import * as d3 from "d3";
import { AxisScales } from "../../shared/models";

@Directive({selector: "[dgpChartBottomAxis]"})
export class DgpChartBottomAxisDirective implements OnChanges {

    @Input()
    scales: AxisScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales) {
            this.renderer.setAttribute(
                this.elementRef.nativeElement,
                "transform",
                "translate(0," + this.scales.yAxisScale.range()[1] + ")"
            );
            this.elementRef.nativeElement.style.transform = "translate(0," + this.scales.yAxisScale.range()[1] + ")";
            d3.select(this.elementRef.nativeElement).call(this.scales.xAxis);
        }

    }

}
