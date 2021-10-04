import { Directive, ElementRef, Inject, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { getMaskIdForFillPattern } from "../../fill-pattern-icon/functions";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Directive({selector: "[dgpBoxPlotBoxFillPattern]"})
export class BoxPlotBoxFillPatternDirective implements OnChanges {

    @Input()
    box: Box;

    @Input()
    boxGroup: BoxGroup;

    @Input()
    scales: BoxPlotScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2,
                @Inject(ID_PREFIX)
                protected readonly idPrefix: string) {
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

            let alpha = "66";

            if (this.box.fillPattern) {
                const maskId = getMaskIdForFillPattern(this.box.fillPattern);
                this.renderer.setAttribute(this.elementRef.nativeElement, "mask", "url(#" + this.idPrefix + "." + maskId + ")");
                alpha = "99";
            }

            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.box.colorHex + alpha);
        }

    }

}
