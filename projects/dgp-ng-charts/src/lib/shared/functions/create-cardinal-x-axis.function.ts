import { CardinalD3AxisScale, CardinalXAxis, ScaleType } from "../models";
import * as d3 from "d3";
import { Axis, ScaleLogarithmic } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";
import { getLinearAxisTickValuesForStep } from "./get-linear-axis-tick-values-for-interval.function";
import { axisTickFormattingService } from "../../bar-chart/functions/axis-tick-formatting.service";
import { getLogTickValues } from "../function/get-log-tick-values.function";
import { byDomain } from "./by-domain.function";
import { NumericDomain } from "../models/numeric-domain.model";
import { formatLogTick } from "./format-log-tick.function";

export function createCardinalXAxis(payload: {
    readonly xAxisModel: CardinalXAxis;
    readonly xAxisScale: CardinalD3AxisScale;
    readonly containerWidth: number;
}): Axis<number> {
    let xAxis: Axis<any>;
    const xAxisModel = payload.xAxisModel;
    const xAxisScale = payload.xAxisScale;

    switch (xAxisModel.xAxisScaleType) {
        default:
        case ScaleType.Linear:

            xAxis = d3.axisBottom(xAxisScale);

            if (notNullOrUndefined(xAxisModel.xAxisStep) && xAxisModel.xAxisStep > 0) {

                const tickValues = getLinearAxisTickValuesForStep({
                    axisScale: xAxisScale,
                    tickInterval: xAxisModel.xAxisStep
                });

                xAxis = xAxis
                    .tickValues(tickValues as number[]);

            } else {
                const xTickCount = axisTickFormattingService.estimateContinuousXAxisTickCount({
                    containerWidth: payload.containerWidth
                });
                xAxis = xAxis
                    .ticks(xTickCount);

            }

            break;
        case ScaleType.Logarithmic:
            const typedScale = xAxisScale as ScaleLogarithmic<number, number>;
            const base = typedScale.base();
            const domain = typedScale.domain();

            const tickValues = getLogTickValues(base)
                .filter(byDomain(domain as NumericDomain));

            xAxis = d3.axisBottom(xAxisScale)
                .tickValues(tickValues)
                .tickFormat(value => formatLogTick(value as unknown as number, base));
            break;

    }

    if (notNullOrUndefined(xAxisModel.xAxisTickFormat)) {
        xAxis = xAxis.tickFormat(xAxisModel.xAxisTickFormat as any);
    }

    return xAxis;
}
