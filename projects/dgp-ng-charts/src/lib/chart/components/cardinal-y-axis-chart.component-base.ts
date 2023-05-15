import { Directive, Input } from "@angular/core";
import { observeAttribute$ } from "dgp-ng-app";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { CardinalYAxis, ChartTitles, ScaleType } from "../../shared/models";
import { DgpPlotComponentBase } from "./plot.component-base";
import { Mutable } from "data-modeling";
import * as d3 from "d3";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpCardinalYAxisChartComponentBase extends DgpPlotComponentBase implements CardinalYAxis, Mutable<ChartTitles> {

    @Input()
    chartTitle: string;

    @Input()
    yAxisTitle: string;

    @Input()
    xAxisTitle: string;

    @Input()
    yAxisMin?: number;
    readonly yAxisMin$ = observeAttribute$(this as DgpCardinalYAxisChartComponentBase, "yAxisMin");

    @Input()
    yAxisMax?: number;
    readonly yAxisMax$ = observeAttribute$(this as DgpCardinalYAxisChartComponentBase, "yAxisMax");

    @Input()
    yAxisStep?: number;
    readonly yAxisStep$ = observeAttribute$(this as DgpCardinalYAxisChartComponentBase, "yAxisStep");

    @Input()
    yAxisScaleType?: ScaleType;
    readonly yAxisScaleType$ = observeAttribute$(this as DgpCardinalYAxisChartComponentBase, "yAxisScaleType");

    @Input()
    yAxisTickFormat?: (x: string) => string;
    readonly yAxisTickFormat$ = observeAttribute$(this as DgpCardinalYAxisChartComponentBase, "yAxisTickFormat");

    @Input()
    yAxisInterpolator: d3.InterpolatorFactory<number, number>;
    readonly yAxisInterpolator$ = observeAttribute$(this as DgpCardinalYAxisChartComponentBase, "yAxisInterpolator");

    readonly yAxis$ = combineLatest([
        this.yAxisMin$,
        this.yAxisMax$,
        this.yAxisStep$,
        this.yAxisScaleType$,
        this.yAxisTickFormat$,
        this.yAxisInterpolator$
    ]).pipe(
        map(x => ({
            yAxisMin: x[0],
            yAxisMax: x[1],
            yAxisStep: x[2],
            yAxisScaleType: x[3],
            yAxisTickFormat: x[4],
            yAxisInterpolator: x[5]
        } as CardinalYAxis))
    );

}
