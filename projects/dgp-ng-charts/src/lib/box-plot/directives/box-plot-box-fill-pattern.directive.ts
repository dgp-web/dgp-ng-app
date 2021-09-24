import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { getMaskIdForFillPattern } from "../../fill-pattern-icon/functions";

@Directive({selector: "[dgpBoxPlotBoxFillPattern]"})
export class BoxPlotBoxFillPatternDirective implements OnChanges {

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

            let alpha = "66";

            if (this.box.fillPattern) {
                const maskId = getMaskIdForFillPattern(this.box.fillPattern);
                this.renderer.setAttribute(this.elementRef.nativeElement, "mask", "url(#" + maskId + ")");
                alpha = "ff";
            }

            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex + alpha);
        }

    }

}
