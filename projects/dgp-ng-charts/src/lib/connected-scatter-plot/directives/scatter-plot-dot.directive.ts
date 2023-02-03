import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterSeries, Dot, DotConfig } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { svgShapeDefaultXOffset, svgShapeDefaultYOffset } from "../../shapes/constants";

@Directive({selector: "[dgpScatterPlotDot]"})
export class DgpScatterPlotDotDirective implements OnChanges, DotConfig {

    @Input()
    dot: Dot;

    @Input()
    series: ConnectedScatterSeries;

    @Input()
    scales: ConnectedScatterPlotScales;

    @Input()
    dotSize: number;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.dot || changes.series || changes.scales || changes.dotSize) {
            const referenceXOffset = this.dotSize / 2 || svgShapeDefaultXOffset;
            const referenceYOffset = this.dotSize / 2 || svgShapeDefaultYOffset;

            const x = this.scales.xAxisScale(this.dot.x);
            const y = this.scales.yAxisScale(this.dot.y);

            this.renderer.setStyle(this.elementRef.nativeElement, "transform",
                "translate(" + (x - referenceXOffset) + "px, " + (y - referenceYOffset) + "px)"
            );
            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.series.colorHex);
        }

    }

}
