import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core"
import { Box, BoxGroup, BoxPlotScales, BoxQuantiles } from "../models";

@Directive({selector: "[dgpBoxPlotMedian]"})
export class BoxPlotMedianDirective implements OnChanges {

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

            const x1 = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId);

            const x2 = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId)
                + this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth();

            const y1 = this.scales.yAxisScale(this.box.quantiles.median);
            const y2 = this.scales.yAxisScale(this.box.quantiles.median);

            this.renderer.setAttribute(this.elementRef.nativeElement, "x1", x1.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "x2", x2.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y1", y1.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y2", y2.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.box.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", "2");
        }

    }


}
