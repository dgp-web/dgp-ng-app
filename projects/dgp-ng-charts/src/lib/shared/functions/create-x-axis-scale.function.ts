// TOOD: Homogenize with createYAxisScale as its qzuite
import { CardinalXAxis, ScaleType } from "../models";
import * as d3 from "d3";
import { ScaleLinear, ScaleLogarithmic } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";

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
