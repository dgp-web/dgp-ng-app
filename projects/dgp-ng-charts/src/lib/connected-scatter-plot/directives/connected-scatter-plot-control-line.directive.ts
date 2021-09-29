import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterPlotControlLine } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";

@Directive({selector: "[dgpConnectedScatterPlotControlLine]"})
export class DgpConnectedScatterPlotControlLineDirective implements OnChanges {

    @Input()
    connectedScatterPlotControlLine: ConnectedScatterPlotControlLine;

    @Input()
    scales: ConnectedScatterPlotScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.connectedScatterPlotControlLine) {

            const y = this.scales.yAxis(this.connectedScatterPlotControlLine.value);
            const xAxisRange = this.scales.xAxis.range();

            this.renderer.setAttribute(this.elementRef.nativeElement, "x1", xAxisRange[0].toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "x2", xAxisRange[1].toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y1", y.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y2", y.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.connectedScatterPlotControlLine.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", ("16, 8"));
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-dasharray", ("16, 8"));

        }

    }

}
