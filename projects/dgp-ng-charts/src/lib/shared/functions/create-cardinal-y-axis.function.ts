import { CardinalD3AxisScale, CardinalYAxis, ScaleType } from "../models";
import * as d3 from "d3";
import { Axis, ScaleLogarithmic } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";
import { getLinearAxisTickValuesForStep } from "./get-linear-axis-tick-values-for-interval.function";
import { axisTickFormattingService } from "../../bar-chart/functions/axis-tick-formatting.service";
import { formatLogTick } from "./format-log-tick.function";
import { getLogTickValues } from "../function/get-log-tick-values.function";

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

            if (notNullOrUndefined(yAxisModel.yAxisStep) && yAxisModel.yAxisStep > 0) {

                const tickValues = getLinearAxisTickValuesForStep({
                    axisScale: yAxisScale,
                    tickInterval: yAxisModel.yAxisStep
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
            const typedScale = yAxisScale as ScaleLogarithmic<number, number>;
            const base = typedScale.base();

            yAxis = d3.axisLeft(yAxisScale)
                .tickValues(getLogTickValues(base))
                .tickFormat(value => formatLogTick(value as unknown as number, base));
            break;

    }

    if (notNullOrUndefined(yAxisModel.yAxisTickFormat)) {
        yAxis = yAxis.tickFormat(yAxisModel.yAxisTickFormat as any);
    }

    return yAxis;
}
