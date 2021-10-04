import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { getJitter } from "../functions";
import { defaultBoxPlotConfig } from "../constants";

@Directive({selector: "[dgpBoxPlotOutlierTooltip]"})
export class BoxPlotOutlierTooltipDirective implements OnChanges {

    @Input()
    box: Box;

    @Input()
    boxGroup: BoxGroup;

    @Input()
    scales: BoxPlotScales;

    @Input()
    value: number;

    config = defaultBoxPlotConfig;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.box || changes.boxGroup) {

            const x = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId)
                + this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth() / 2
                + getJitter(this.box.boxId + this.value, this.config) + 8;

            const y = this.scales.yAxisScale(this.value) + 4;

            this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());

        }

    }

}
