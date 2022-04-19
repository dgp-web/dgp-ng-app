import { Directive, ElementRef, Input, ViewChild } from "@angular/core";
import { Mutable } from "data-modeling";
import { Chart } from "../../shared/models";
import { DgpPlotContainerComponent } from "../../plot-container/components/plot-container.component";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpChartComponentBase implements Mutable<Chart> {

    @ViewChild(DgpPlotContainerComponent, {read: ElementRef, static: true})
    elRef: ElementRef<HTMLDivElement>;

    @Input()
    chartTitle: string;

    @Input()
    yAxisTitle: string;

    @Input()
    xAxisTitle: string;

    @Input()
    showYAxisGridLines = true;

    @Input()
    showXAxisGridLines = true;


}
