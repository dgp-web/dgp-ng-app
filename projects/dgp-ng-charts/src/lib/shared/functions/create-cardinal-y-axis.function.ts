import { CardinalD3AxisScale, CardinalYAxis, ScaleType } from "../models";
import * as d3 from "d3";
import { Axis } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";
import { getLinearAxisTickValuesForInterval } from "./get-linear-axis-tick-values-for-interval.function";
import { axisTickFormattingService } from "../../bar-chart/functions/axis-tick-formatting.service";
import { logTickValues } from "../constants";
import { formatLogTick } from "./format-log-tick.function";

export function createCardinalYAxis(payload: {
    readonly yAxisModel: CardinalYAxis;
    readonly yAxisScale: CardinalD3AxisScale;
    readonly containerHeight: number;
}): Axis<number> {
    let yAxis: Axis<any>;
    const yAxisModel = payload.yAxisModel;
    const yAxisScale = payload.yAxisScale;

    switch (yAxisModel.yAxisScaleType) {
        default:
        case ScaleType.Linear:

            yAxis = d3.axisLeft(yAxisScale);

            if (notNullOrUndefined(yAxisModel.yAxisTickInterval) && yAxisModel.yAxisTickInterval > 0) {

                const tickValues = getLinearAxisTickValuesForInterval({
                    axisScale: yAxisScale,
                    tickInterval: yAxisModel.yAxisTickInterval
                });

                yAxis = yAxis
                    .tickValues(tickValues as number[])
                    .tickFormat(x => x.valueOf().toPrecision(3));

            } else {
                const yTickCount = axisTickFormattingService.estimateContinuousYAxisTickCount({
                    containerHeight: payload.containerHeight
                });
                yAxis = yAxis
                    .ticks(yTickCount)
                    .tickFormat(x => x.valueOf().toPrecision(3));
            }

            break;
        case ScaleType.Logarithmic:
            yAxis = d3.axisLeft(yAxisScale)
                .tickValues(logTickValues)
                .tickFormat(formatLogTick);
            break;

    }

    if (notNullOrUndefined(yAxisModel.yAxisTickFormat)) {
        yAxis = yAxis.tickFormat(yAxisModel.yAxisTickFormat as any);
    }

    return yAxis;
}
