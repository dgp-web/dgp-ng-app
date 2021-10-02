import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterGroup, ConnectedScatterSeries, Dot } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";

@Directive({selector: "[dgpScatterPlotDotTooltip]"})
export class DgpScatterPlotDotTooltipDirective implements OnChanges {

    @Input()
    dot: Dot;

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

        if (changes.dot || changes.series || changes.group || changes.scales) {

            const x = this.scales.xAxisScale(this.dot.x) + 8;
            const y = this.scales.yAxisScale(this.dot.y) + 4;

            this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
        }

    }

}
