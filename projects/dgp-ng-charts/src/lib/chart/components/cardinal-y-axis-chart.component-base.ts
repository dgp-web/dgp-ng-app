import { Directive, Input } from "@angular/core";
import { observeAttribute$ } from "dgp-ng-app";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { CardinalYAxis, ScaleType } from "../../shared/models";
import { DgpChartComponentBase } from "./chart.component-base";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpCardinalYAxisChartComponentBase extends DgpChartComponentBase implements CardinalYAxis {

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

    readonly yAxis$ = combineLatest([
        this.yAxisMin$,
        this.yAxisMax$,
        this.yAxisStep$,
        this.yAxisScaleType$,
        this.yAxisTickFormat$,
    ]).pipe(
        map(x => ({
            yAxisMin: x[0],
            yAxisMax: x[1],
            yAxisStep: x[2],
            yAxisScaleType: x[3],
            yAxisTickFormat: x[4]
        } as CardinalYAxis))
    );

}
