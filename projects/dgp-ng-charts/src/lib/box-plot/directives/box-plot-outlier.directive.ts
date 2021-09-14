import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { getJitter } from "../functions";
import { defaultBoxPlotConfig } from "../constants";

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

            const cx = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId)
                + this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth() / 2
                + getJitter(this.box.boxId + this.value, this.config);

            const cy = this.scales.yAxis(this.value);

            this.renderer.setAttribute(this.elementRef.nativeElement, "cx", cx.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "cy", cy.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "r", "3");
            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex);

            this.renderer.setAttribute(this.elementRef.nativeElement, "tabindex", "0");
        }

    }


}

