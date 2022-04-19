import { Directive, Input } from "@angular/core";
import { observeAttribute$ } from "dgp-ng-app";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { DgpCardinalYAxisChartComponentBase } from "./cardinal-y-axis-chart.component-base";
import { CardinalXAxis, ScaleType } from "../../shared/models";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DgpCardinalXYAxisChartComponentBase extends DgpCardinalYAxisChartComponentBase implements CardinalXAxis {

    @Input()
    xAxisMin?: number;
    readonly xAxisMin$ = observeAttribute$(this as DgpCardinalXYAxisChartComponentBase, "xAxisMin");

    @Input()
    xAxisMax?: number;
    readonly xAxisMax$ = observeAttribute$(this as DgpCardinalXYAxisChartComponentBase, "xAxisMax");

    @Input()
    xAxisStep?: number;
    readonly xAxisStep$ = observeAttribute$(this as DgpCardinalXYAxisChartComponentBase, "xAxisStep");

    @Input()
    xAxisScaleType?: ScaleType;
    readonly xAxisScaleType$ = observeAttribute$(this as DgpCardinalXYAxisChartComponentBase, "xAxisScaleType");

    @Input()
    xAxisTickFormat?: (x: string) => string;
    readonly xAxisTickFormat$ = observeAttribute$(this as DgpCardinalXYAxisChartComponentBase, "xAxisTickFormat");

    readonly xAxis$ = combineLatest([
        this.xAxisMin$,
        this.xAxisMax$,
        this.xAxisStep$,
        this.xAxisScaleType$,
        this.xAxisTickFormat$,
    ]).pipe(
        map(x => ({
            xAxisMin: x[0],
            xAxisMax: x[1],
            xAxisStep: x[2],
            xAxisScaleType: x[3],
            xAxisTickFormat: x[4]
        } as CardinalXAxis))
    );

}
