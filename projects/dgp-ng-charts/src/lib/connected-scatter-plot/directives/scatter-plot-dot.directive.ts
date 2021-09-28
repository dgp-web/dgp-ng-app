import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterGroup, ConnectedScatterSeries, Dot } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";

@Directive({selector: "[dgpScatterPlotDot]"})
export class DgpScatterPlotDotDirective implements OnChanges {

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

        if (changes.dot || changes.series || changes.group) {

            const x = this.scales.xAxis(this.dot.x);
            const y = this.scales.yAxis(this.dot.y);

            this.renderer.setAttribute(this.elementRef.nativeElement, "cx", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "cy", y.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "r", "3");

            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.series.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "tabindex", "0");
        }

    }

}
