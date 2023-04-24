import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterPlotControlLine } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { mapStrokeToStrokeDasharray } from "../../stroke/functions";
import { ControlLineAxis } from "../../stroke/models";

@Directive({selector: "[dgpConnectedScatterPlotControlLine]"})
export class DgpConnectedScatterPlotControlLineDirective implements OnChanges {

    @Input()
    connectedScatterPlotControlLine: ConnectedScatterPlotControlLine;

    @Input()
    scales: ConnectedScatterPlotScales;

    @Input()
    lineWidth = 1.5;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.connectedScatterPlotControlLine || changes.lineWidth) {

            if (!this.connectedScatterPlotControlLine.axis || this.connectedScatterPlotControlLine.axis === ControlLineAxis.Y) {
                const y = this.scales.yAxisScale(this.connectedScatterPlotControlLine.value);
                const xAxisRange = this.scales.xAxisScale.range();

                this.renderer.setAttribute(this.elementRef.nativeElement, "x1", xAxisRange[0].toString());
                this.renderer.setAttribute(this.elementRef.nativeElement, "x2", xAxisRange[1].toString());
                this.renderer.setAttribute(this.elementRef.nativeElement, "y1", y.toString());
                this.renderer.setAttribute(this.elementRef.nativeElement, "y2", y.toString());
            } else {
                const x = this.scales.xAxisScale(this.connectedScatterPlotControlLine.value);
                const yAxisRange = this.scales.yAxisScale.range();

                this.renderer.setAttribute(this.elementRef.nativeElement, "x1", x.toString());
                this.renderer.setAttribute(this.elementRef.nativeElement, "x2", x.toString());
                this.renderer.setAttribute(this.elementRef.nativeElement, "y1", yAxisRange[0].toString());
                this.renderer.setAttribute(this.elementRef.nativeElement, "y2", yAxisRange[1].toString());
            }

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.connectedScatterPlotControlLine.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-dasharray", mapStrokeToStrokeDasharray(this.connectedScatterPlotControlLine.stroke));
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", this.lineWidth.toString());

        }

    }

}
