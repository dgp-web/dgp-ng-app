import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { ConnectedScatterGroup, ConnectedScatterSeries } from "../models";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";

@Directive({selector: "[dgpLineChartLine]"})
export class DgpLineChartLineDirective implements OnChanges {

    @Input()
    series: ConnectedScatterSeries;

    @Input()
    group: ConnectedScatterGroup;

    @Input()
    scales: ConnectedScatterPlotScales;

    constructor(private readonly elementRef: ElementRef,
                private readonly renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.dot || changes.series || changes.group || changes.scales) {

        }

    }


}
