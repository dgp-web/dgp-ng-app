import { CardinalD3AxisScale, CardinalXAxis, CardinalYAxis, ScaleType } from "../models";
import * as d3 from "d3";
import { Axis, ScaleLogarithmic } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";
import { getLinearAxisTickValuesForStep } from "./get-linear-axis-tick-values-for-interval.function";
import { axisTickFormattingService } from "../../bar-chart/functions/axis-tick-formatting.service";
import { formatLogTick } from "./format-log-tick.function";
import { getLogTickValues } from "../function/get-log-tick-values.function";
import { NumericDomain } from "../models/numeric-domain.model";
import { byDomain, byInvertedDomain } from "./by-domain.function";

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

            console.log(tickValues);

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

