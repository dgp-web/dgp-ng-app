import { Directive, ElementRef, Inject, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Bar, BarChartScales, BarGroup } from "../models";
import { getMaskIdForFillPattern } from "../../fill-pattern-icon/functions";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";

@Directive({selector: "[dgpBarChartBarFillPattern]"})
export class BarChartBarFillPatternDirective implements OnChanges {

    @Input()
    bar: Bar;

    @Input()
    barGroup: BarGroup;

    @Input()
    scales: BarChartScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2,
                @Inject(ID_PREFIX)
                protected readonly idPrefix: string) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.bar || changes.barGroup) {
            const xAxisSubgroup = this.scales.xAxisSubgroupKVS[this.barGroup.barGroupKey];
            /**
             * When the scales change, it may happen that we don't have entries for a specific key yet.
             *
             * Then we have to stop, else we are going to crash
             */
            if (!xAxisSubgroup) return;

            const x = xAxisSubgroup(this.bar.barKey);
            if (!x) return;

            const y0 = this.scales.yAxisScale(0);
            const yValue = this.scales.yAxisScale(this.bar.value);

            const y = this.bar.value >= 0 ? yValue : y0;
            const height = this.bar.value >= 0 ? y0 : yValue;
            const width = xAxisSubgroup.bandwidth();

            this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
            if (width >= 0) {
                this.renderer.setAttribute(this.elementRef.nativeElement, "width", width.toString());
            }
            if (height >= 0) {
                this.renderer.setAttribute(this.elementRef.nativeElement, "height", height.toString());
            }

            let alpha = "66";

            if (this.bar.fillPattern) {
                const maskId = getMaskIdForFillPattern(this.bar.fillPattern);
                this.renderer.setAttribute(this.elementRef.nativeElement, "mask", "url(#" + this.idPrefix + "." + maskId + ")");
                alpha = "99";
            }

            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.bar.colorHex + alpha);


        }

    }

}
