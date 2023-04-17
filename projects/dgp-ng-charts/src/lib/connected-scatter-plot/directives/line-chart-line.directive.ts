import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterSeries, Dot } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { line } from "d3";
import { mapStrokeToStrokeDasharray } from "../../stroke/functions";

@Directive({selector: "[dgpLineChartLine]"})
export class DgpLineChartLineDirective implements AfterViewInit, OnChanges {

    @Input()
    series: ConnectedScatterSeries;

    @Input()
    scales: ConnectedScatterPlotScales;

    @Input()
    lineWidth = 1.5;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.elementRef.nativeElement, "fill", "transparent");
        this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", this.lineWidth.toString());
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.series) {
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.series.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-dasharray", mapStrokeToStrokeDasharray(this.series.stroke));
        }

        if (changes.lineWidth) {
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", this.lineWidth.toString());
        }

        if (changes.series || changes.scales) {
            const createLine = line<Dot>().x(dot => {
                return this.scales.xAxisScale(dot.x);
            }).y(dot => {
                return this.scales.yAxisScale(dot.y);
            });

            const d = createLine(this.series.dots as Array<Dot>);

            if (d.includes("NaN")) return;

            this.renderer.setAttribute(this.elementRef.nativeElement, "d", d);

        }

    }


}
