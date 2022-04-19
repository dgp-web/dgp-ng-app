import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { BarChartScales, BarGroup } from "../models";

@Directive({selector: "[dgpBarChartBarGroup]"})
export class BarChartBarGroupDirective implements OnChanges {

    @Input()
    barGroup: BarGroup;

    @Input()
    scales: BarChartScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.barGroup) {
            const transform = "translate(" + this.scales.xAxisScale(this.barGroup.barGroupKey) + ")";
            this.renderer.setAttribute(this.elementRef.nativeElement, "transform", transform);
        }

    }

}
