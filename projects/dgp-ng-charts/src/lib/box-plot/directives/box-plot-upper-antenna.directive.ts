import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";

@Directive({selector: "[dgpBoxPlotUpperAntenna]"})
export class BoxPlotUpperAntennaDirective implements OnChanges {

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

            const x1 = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId)
                + this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth() / 2;

            const x2 = x1;

            const y1 = this.scales.yAxis(this.box.quantiles.min);
            const y2 = this.scales.yAxis(this.box.quantiles.lower);

            this.renderer.setAttribute(this.elementRef.nativeElement, "x1", x1.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "x2", x2.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y1", y1.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y2", y2.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.box.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", "2");
        }

    }

}
