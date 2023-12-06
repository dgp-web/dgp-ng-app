import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { BarChartScales, BarGroup } from "../models";
import { isNullOrUndefined } from "dgp-ng-app";

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
            const xValue = this.scales.xAxisScale(this.barGroup.barGroupKey);
            /**
             * When the scales change, it may happen that we don't have entries for a specific key yet.
             *
             * Then we have to stop, else we are going to crash
             */
            if (isNullOrUndefined(xValue)) return;

            const transform = "translate(" + xValue + ")";
            this.renderer.setAttribute(this.elementRef.nativeElement, "transform", transform);
        }

    }

}
