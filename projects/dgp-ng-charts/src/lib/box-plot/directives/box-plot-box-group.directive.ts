import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { BoxGroup, BoxPlotScales } from "../models";

@Directive({selector: "[dgpBoxPlotBoxGroup]"})
export class BoxPlotBoxGroupDirective implements OnChanges {

    @Input()
    boxGroup: BoxGroup;

    @Input()
    scales: BoxPlotScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.scales || changes.boxGroup) {
            const transform = "translate(" + this.scales.xAxisScale(this.boxGroup.boxGroupId) + ")";
            this.renderer.setAttribute(this.elementRef.nativeElement, "transform", transform);
        }

    }

}
