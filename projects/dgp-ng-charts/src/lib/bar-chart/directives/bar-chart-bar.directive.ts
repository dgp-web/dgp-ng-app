import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { Bar, BarChartScales, BarGroup } from "../models";

@Directive({selector: "[dgpBarChartBar]"})
export class BarChartBarDirective implements OnChanges {

    @Input()
    bar: Bar;

    @Input()
    barGroup: BarGroup;

    @Input()
    scales: BarChartScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
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

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.bar.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", "2");
            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.bar.colorHex + "00");

        }

    }

}
