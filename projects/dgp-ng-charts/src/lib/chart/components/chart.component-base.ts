import { Directive, Input } from "@angular/core";
import { Mutable } from "data-modeling";
import { ChartTitles } from "../../shared/models";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpChartComponentBase implements Mutable<ChartTitles> {

    @Input()
    chartTitle: string;

    @Input()
    yAxisTitle: string;

    @Input()
    xAxisTitle: string;
}

