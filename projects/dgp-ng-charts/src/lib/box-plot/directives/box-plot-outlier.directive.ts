import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { getJitter } from "../functions";
import { defaultBoxPlotConfig } from "../constants/default-box-plot-config.constant";
import { svgShapeDefaultXOffset, svgShapeDefaultYOffset } from "../../shapes/constants";
import { DotConfig } from "../../connected-scatter-plot/models";

@Directive({selector: "[dgpBoxPlotOutlier]"})
export class BoxPlotOutlierDirective implements OnChanges, DotConfig {

    @Input()
    box: Box;

    @Input()
    boxGroup: BoxGroup;

    @Input()
    value: number;

    @Input()
    scales: BoxPlotScales;

    @Input()
    dotSize: number;

    config = defaultBoxPlotConfig;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.box || changes.boxGroup) {
            const referenceXOffset = this.dotSize / 2 || svgShapeDefaultXOffset;
            const referenceYOffset = this.dotSize / 2 || svgShapeDefaultYOffset;

            const x = this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId](this.box.boxId)
                + this.scales.xAxisSubgroupKVS[this.boxGroup.boxGroupId].bandwidth() / 2
                + getJitter(this.box.boxId + this.value, this.config);

            const y = this.scales.yAxisScale(this.value);

            this.renderer.setStyle(this.elementRef.nativeElement, "transform",
                "translate(" + (x - referenceXOffset) + "px, " + (y - referenceYOffset) + "px)"
            );
            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex);
        }

    }


}

