import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";

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
            const y = this.scales.yAxisScale(this.box.quantiles.upper);

            const height = Math.abs(
                (this.scales.yAxisScale(this.box.quantiles.lower) - this.scales.yAxisScale(this.box.quantiles.upper))
            );
            const width = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth();

            this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "width", width.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "height", height.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.box.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", "2");
            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex + "00");

        }

    }

}
