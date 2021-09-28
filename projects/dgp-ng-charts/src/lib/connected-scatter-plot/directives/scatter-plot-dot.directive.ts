import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterGroup, ConnectedScatterSeries, Dot } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { Shape } from "../../symbols/models";

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

        if (changes.dot || changes.series || changes.group || changes.scales) {

            const x = this.scales.xAxis(this.dot.x);
            const y = this.scales.yAxis(this.dot.y);

            switch (this.series.shape) {
                default:
                case Shape.Circle:
                    this.renderer.setAttribute(this.elementRef.nativeElement, "cx", x.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "cy", y.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "r", "3");
                    break;
                case Shape.Rectangle:
                    this.renderer.setAttribute(this.elementRef.nativeElement, "x", (x-3).toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "y", (y-3).toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "width", "6px");
                    this.renderer.setAttribute(this.elementRef.nativeElement, "height", "6px");
                    break;
                case Shape.Rhombus:
                case Shape.Triangle:
                case Shape.TriangleDown:
                case Shape.TriangleLeft:
                case Shape.TriangleRight:
                case Shape.Star:
                    this.renderer.setStyle(this.elementRef.nativeElement, "transform",
                        "translate(" + (x - 4.5) + "px, " + (y - 4.5) + "px)"
                    );
                    this.renderer.setAttribute(this.elementRef.nativeElement, "width", "6px");
                    this.renderer.setAttribute(this.elementRef.nativeElement, "height", "6px");
                    break;
            }

            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.series.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "tabindex", "0");
        }

    }

}
