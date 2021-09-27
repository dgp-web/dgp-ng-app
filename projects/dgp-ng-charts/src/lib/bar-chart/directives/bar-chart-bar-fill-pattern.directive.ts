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

            const x = this.scales.xAxisSubgroupKVS[this.barGroup.barGroupKey](this.bar.barKey);
            const y = this.scales.yAxis(this.bar.value);
            const height = Math.abs(y - this.scales.yAxis(0));
            const width = this.scales.xAxisSubgroupKVS[this.barGroup.barGroupKey].bandwidth();

            this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "width", width.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "height", height.toString());

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