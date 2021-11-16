import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { getJitter } from "../functions";
import { defaultBoxPlotConfig } from "../constants";
import { Shape } from "../../shapes/models";

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

            const x = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId)
                + this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth() / 2
                + getJitter(this.box.boxId + this.value, this.config);

            const y = this.scales.yAxisScale(this.value);

            switch (this.box.outlierShape) {
                default:
                case Shape.Circle:
                    this.renderer.setAttribute(this.elementRef.nativeElement, "cx", x.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "cy", y.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "r", "6");
                    break;
                case Shape.Rectangle:
                    this.renderer.setAttribute(this.elementRef.nativeElement, "x", (x-6).toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "y", (y-6).toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "width", "12px");
                    this.renderer.setAttribute(this.elementRef.nativeElement, "height", "12px");
                    break;
                case Shape.Rhombus:
                case Shape.Triangle:
                case Shape.TriangleDown:
                case Shape.TriangleLeft:
                case Shape.TriangleRight:
                case Shape.Star:
                    this.renderer.setStyle(this.elementRef.nativeElement, "transform",
                        "translate(" + (x - 6) + "px, " + (y - 6) + "px)"
                    );
                    this.renderer.setAttribute(this.elementRef.nativeElement, "width", "12px");
                    this.renderer.setAttribute(this.elementRef.nativeElement, "height", "12px");
                    break;
            }


            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "tabindex", "0");
        }

    }


}

