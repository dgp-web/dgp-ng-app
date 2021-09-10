import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales, FillPattern } from "../models";

@Directive({selector: "[dgpBoxPlotBox]"})
export class BoxPlotBoxDirective implements OnChanges {

    @Input()
    box: Box;

    @Input()
    boxGroup: BoxGroup;

    @Input()
    scales: BoxPlotScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.box || changes.boxGroup) {

            const x = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId);
            const y = this.scales.yAxis(this.box.quantiles.upper);

            const height = Math.abs(
                (this.scales.yAxis(this.box.quantiles.lower) - this.scales.yAxis(this.box.quantiles.upper))
            );
            const width = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth();

            this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "width", width.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "height", height.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.box.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", "2");
            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex + "66");

            if (this.box.fillPattern) {

                switch (this.box.fillPattern) {
                    case FillPattern.All:
                        break;
                    case FillPattern.VerticalLines:
                        break;
                    case FillPattern.LinesFromLeftTopToRightBottom:
                        break;
                    case FillPattern.HorizontalLines:
                        break;
                    case FillPattern.LinesFromLeftBottomToRightTop:
                        break;
                    case FillPattern.Grid:
                        break;
                    case FillPattern.DiagonalGrid:
                        break;
                    case FillPattern.Checkerboard:
                        this.renderer.setAttribute(this.elementRef.nativeElement, "mask", "url(#checkerboard-mask)");
                        break;
                    case FillPattern.DiagonalCheckerboard:
                        this.renderer.setAttribute(this.elementRef.nativeElement, "mask", "url(#diagonal-checkerboard-mask)");
                        break;
                }

            }

        }

    }

}
