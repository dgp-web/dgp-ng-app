import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterGroup, ConnectedScatterSeries, Dot } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { Shape } from "../../shapes/models";
import {
    svgShapeDefaultHeight,
    svgShapeDefaultWidth,
    svgShapeDefaultRadius,
    svgShapeDefaultXOffset,
    svgShapeDefaultYOffset
} from "../../shapes/constants";

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

            const referenceWidth = svgShapeDefaultWidth;
            const referenceHeight = svgShapeDefaultHeight;
            const referenceXOffset = svgShapeDefaultXOffset;
            const referenceYOffset = svgShapeDefaultYOffset;
            const referenceRadius = svgShapeDefaultRadius;

            const x = this.scales.xAxisScale(this.dot.x);
            const y = this.scales.yAxisScale(this.dot.y);

            switch (this.series.shape || this.group.shape) {
                default:
                case Shape.Circle:
                    this.renderer.setAttribute(this.elementRef.nativeElement, "cx", x.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "cy", y.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "r", referenceRadius.toString());
                    break;
                case Shape.Rectangle:
                    this.renderer.setAttribute(this.elementRef.nativeElement, "x", (x - referenceXOffset).toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "y", (y - referenceYOffset).toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "width", referenceWidth + "px");
                    this.renderer.setAttribute(this.elementRef.nativeElement, "height", referenceHeight + "px");
                    break;
                case Shape.Rhombus:
                case Shape.Triangle:
                case Shape.TriangleDown:
                case Shape.TriangleLeft:
                case Shape.TriangleRight:
                case Shape.Star:
                case Shape.Cross:
                    this.renderer.setStyle(this.elementRef.nativeElement, "transform",
                        "translate(" + (x - referenceXOffset) + "px, " + (y - referenceYOffset) + "px)"
                    );
                    this.renderer.setAttribute(this.elementRef.nativeElement, "width", referenceWidth + "px");
                    this.renderer.setAttribute(this.elementRef.nativeElement, "height", referenceHeight + "px");
                    break;
            }

            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.series.colorHex || this.group.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "tabindex", "0");
        }

    }

}
