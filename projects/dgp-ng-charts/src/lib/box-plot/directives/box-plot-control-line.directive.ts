import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { BoxPlotControlLine, BoxPlotScales } from "../models";
import { mapStrokeToStrokeDasharray } from "../../stroke/functions";

@Directive({selector: "[dgpBoxPlotControlLine]"})
export class BoxPlotControlLineDirective implements OnChanges {

    @Input()
    boxPlotControlLine: BoxPlotControlLine;

    @Input()
    scales: BoxPlotScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.boxPlotControlLine) {

            const y = this.scales.yAxisScale(this.boxPlotControlLine.value);
            const xAxisRange = this.scales.xAxisScale.range();

            this.renderer.setAttribute(this.elementRef.nativeElement, "x1", xAxisRange[0].toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "x2", xAxisRange[1].toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y1", y.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y2", y.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.boxPlotControlLine.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-dasharray", mapStrokeToStrokeDasharray(this.boxPlotControlLine.stroke));

        }

    }

}
