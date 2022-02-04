import { CardinalYAxis, ScaleType } from "../models";
import * as d3 from "d3";
import { ScaleLinear, ScaleLogarithmic } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";

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
