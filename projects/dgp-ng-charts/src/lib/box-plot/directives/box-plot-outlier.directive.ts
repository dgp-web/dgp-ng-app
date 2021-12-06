import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { getJitter } from "../functions";
import { defaultBoxPlotConfig } from "../constants";
import { Shape } from "../../shapes/models";
import {
    svgShapeDefaultHeight,
    svgShapeDefaultWidth,
    svgShapeDefaultRadius,
    svgShapeDefaultXOffset,
    svgShapeDefaultYOffset
} from "../../shapes/constants";

@Directive({selector: "[dgpBoxPlotOutlier]"})
export class BoxPlotOutlierDirective implements OnChanges {

    @Input()
    box: Box;

    @Input()
    boxGroup: BoxGroup;

    @Input()
    value: number;

    @Input()
    scales: BoxPlotScales;

    config = defaultBoxPlotConfig;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.box || changes.boxGroup) {

            const referenceWidth = svgShapeDefaultWidth;
            const referenceHeight = svgShapeDefaultHeight;
            const referenceXOffset = svgShapeDefaultXOffset;
            const referenceYOffset = svgShapeDefaultYOffset;
            const referenceRadius = svgShapeDefaultRadius;

            const x = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId)
                + this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth() / 2
                + getJitter(this.box.boxId + this.value, this.config);

            const y = this.scales.yAxisScale(this.value);

            switch (this.box.outlierShape) {
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
                    this.renderer.setStyle(this.elementRef.nativeElement, "transform",
                        "translate(" + (x - referenceXOffset) + "px, " + (y - referenceYOffset) + "px)"
                    );
                    this.renderer.setAttribute(this.elementRef.nativeElement, "width", referenceWidth + "px");
                    this.renderer.setAttribute(this.elementRef.nativeElement, "height", referenceHeight + "px");
                    break;
            }


            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "tabindex", "0");
        }

    }


}

