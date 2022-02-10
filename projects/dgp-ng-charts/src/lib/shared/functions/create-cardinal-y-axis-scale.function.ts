import { CardinalXAxis, CardinalYAxis, ScaleType } from "../models";
import * as d3 from "d3";
import { ScaleLinear, ScaleLogarithmic } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";

// TOOD: Homogenize with createYAxisScale as its qzuite
export function createXAxisScale(payload: CardinalXAxis & {
    readonly dataAreaWidth: number;
    readonly xMin: number;
    readonly xMax: number;
}) {
    const dataAreaWidth = payload.dataAreaWidth;
    const xMin = payload.xMin;
    const xMax = payload.xMax;
    const xAxisStep = payload.xAxisStep;

    let xAxisScale: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;

    switch (payload.xAxisScaleType) {
        default:
        case ScaleType.Linear:
            xAxisScale = d3.scaleLinear()
                .domain([xMin, xMax])
                .range([0, dataAreaWidth]);
            break;
        case ScaleType.Logarithmic:
            xAxisScale = d3.scaleLog();

            if (notNullOrUndefined(xAxisStep) && xAxisStep > 0) {
                xAxisScale = (xAxisScale as ScaleLogarithmic<number, number>).base(xAxisStep);
            }

            xAxisScale = (xAxisScale as ScaleLogarithmic<number, number>)
                .domain([(xMin >= 0 ? xMin : 0.001), (xMax >= 0 ? xMax : 0.001)])
                .range([0, dataAreaWidth]);
            break;
    }

    return xAxisScale;

}

export function createYAxisScale(payload: CardinalYAxis & {
    readonly dataAreaHeight: number;
    readonly yMin: number;
    readonly yMax: number;
}) {

    const dataAreaHeight = payload.dataAreaHeight;
    const yMin = payload.yMin;
    const yMax = payload.yMax;
    const yAxisStep = payload.yAxisStep;

    let yAxisScale: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;

    switch (payload.yAxisScaleType) {
        default:
        case ScaleType.Linear:
            yAxisScale = d3.scaleLinear()
                .domain([yMax, yMin])
                .range([0, dataAreaHeight]);
            break;
        case ScaleType.Logarithmic:
            yAxisScale = d3.scaleLog();

            if (notNullOrUndefined(yAxisStep) && yAxisStep > 0) {
                yAxisScale = (yAxisScale as ScaleLogarithmic<number, number>).base(yAxisStep);
            }

            yAxisScale = (yAxisScale as ScaleLogarithmic<number, number>)
                .domain([(yMax >= 0 ? yMax : 0.001), (yMin >= 0 ? yMin : 0.001)])
                .range([0, dataAreaHeight]);
            break;
    }

    return yAxisScale;

}
