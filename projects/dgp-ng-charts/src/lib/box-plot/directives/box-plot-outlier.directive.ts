import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { getJitter } from "../functions";
import { defaultBoxPlotConfig } from "../constants";
import { Shape } from "../../symbols/models";

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

            const y = this.scales.yAxis(this.value);

            switch (this.box.outlierShape) {
                default:
                case Shape.Circle:
                    this.renderer.setAttribute(this.elementRef.nativeElement, "cx", x.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "cy", y.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "r", "3");
                    break;
                case Shape.Rectangle:
                    this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
                    this.renderer.setAttribute(this.elementRef.nativeElement, "width", "6px");
                    this.renderer.setAttribute(this.elementRef.nativeElement, "height", "6px");
                    break;
                case Shape.Rhombus:
                    break;
                case Shape.Triangle:
                    break;
                case Shape.TriangleDown:
                    break;
                case Shape.TriangleLeft:
                    break;
                case Shape.TriangleRight:
                    break;
                case Shape.Star:
                    break;

            }


            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "tabindex", "0");
        }

    }


}

