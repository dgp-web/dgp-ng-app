import { CardinalD3AxisScale, CardinalYAxis, ScaleType } from "../models";
import * as d3 from "d3";
import { Axis, ScaleLogarithmic } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";
import { axisTickFormattingService } from "../../bar-chart/functions/axis-tick-formatting.service";
import { formatLogTick } from "./format-log-tick.function";
import { getLogTickValues } from "../function/get-log-tick-values.function";
import { NumericDomain } from "../models/numeric-domain.model";
import { byInvertedDomain } from "./by-domain.function";
import { getLinearAxisTickValuesForStep } from "./get-linear-axis-tick-values-for-interval.function";

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

            if (notNullOrUndefined(yAxisModel.yAxisTickValues)) {
                yAxis = yAxis
                    .tickValues(yAxisModel.yAxisTickValues as number[]);
            } else if (notNullOrUndefined(yAxisModel.yAxisStep) && yAxisModel.yAxisStep > 0) {

                const tickValues = getLinearAxisTickValuesForStep({
                    axisScale: yAxisScale,
                    tickInterval: yAxisModel.yAxisStep
                });
                yAxis = yAxis
                    .tickValues(tickValues as number[]);

            } else {
                const yTickCount = axisTickFormattingService.estimateContinuousYAxisTickCount({
                    containerHeight: payload.containerHeight
                });
                yAxis = yAxis
                    .ticks(yTickCount);

            }

            break;
        case ScaleType.Logarithmic:
            const typedScale = yAxisScale as ScaleLogarithmic<number, number>;
            const base = typedScale.base();
            const domain = typedScale.domain();

            const tickValues = getLogTickValues(base)
                .filter(byInvertedDomain(domain as NumericDomain));

            yAxis = d3.axisLeft(yAxisScale)
                .tickValues(tickValues)
                .tickFormat(value => formatLogTick(value as unknown as number, base));
            break;

    }

    if (notNullOrUndefined(yAxisModel.yAxisTickFormat)) {
        yAxis = yAxis.tickFormat(yAxisModel.yAxisTickFormat as any);
    }

    return yAxis;
}

