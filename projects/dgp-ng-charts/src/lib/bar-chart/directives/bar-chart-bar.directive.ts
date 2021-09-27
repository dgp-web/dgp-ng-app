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

            const x = this.scales.xAxisSubgroupKVS[this.barGroup.barGroupKey](this.bar.barKey);
            const y = this.scales.yAxis(this.bar.value);
            const height = Math.abs(y - this.scales.yAxis(0));
            const width = this.scales.xAxisSubgroupKVS[this.barGroup.barGroupKey].bandwidth();

            this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "width", width.toString());
            this.renderer.setAttribute(this.elementRef.nativeElement, "height", height.toString());

            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke", this.bar.colorHex);
            this.renderer.setAttribute(this.elementRef.nativeElement, "stroke-width", "2");
            this.renderer.setAttribute(this.elementRef.nativeElement, "fill", this.bar.colorHex + "66");

        }

    }

}
