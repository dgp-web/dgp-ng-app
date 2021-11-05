import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterGroup, ConnectedScatterSeries, Dot } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { line } from "d3";
import { mapStrokeToStrokeDasharray } from "../../stroke/functions";

@Directive({selector: "[dgpLineChartLine]"})
export class DgpLineChartLineDirective implements OnChanges {

    @Input()
    series: ConnectedScatterSeries;

    @Input()
    group: ConnectedScatterGroup;

    @Input()
    scales: ConnectedScatterPlotScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.series || changes.group || changes.scales) {

            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", "transparent");
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.series.colorHex || this.group.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", "1.5");
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-dasharray", mapStrokeToStrokeDasharray(this.series.stroke));

            const createLine = line<Dot>().x(dot => {
                return this.scales.xAxisScale(dot.x);
            }).y(dot => {
                return this.scales.yAxisScale(dot.y);
            });

            const d = createLine(this.series.dots as Array<Dot>);

            this.renderer.setAttribute(this.elementRef.nativeElement, "d", d);

        }

    }


}
