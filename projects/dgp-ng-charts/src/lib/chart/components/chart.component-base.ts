import { Directive, Input } from "@angular/core";
import { Mutable } from "data-modeling";
import { Chart } from "../../shared/models";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpChartComponentBase implements Mutable<Chart> {

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
