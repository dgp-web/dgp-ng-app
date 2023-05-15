import { ScaleType } from "../models";
import { reverseDomain } from "./reverse-domain.function";
import { createCardinalAxisScale } from "./create-cardinal-axis-scale.function";
import * as d3 from "d3";

export function createYAxisScale(payload: {
    readonly dataAreaHeight: number;
    readonly yMin: number;
    readonly yMax: number;
    readonly yAxisStep?: number;
    readonly yAxisScaleType?: ScaleType;
    readonly yAxisInterpolator?: d3.InterpolatorFactory<number, number>;
}) {

    let scale = createCardinalAxisScale({
        max: payload.yMax,
        min: payload.yMin,
        dataAreaSize: payload.dataAreaHeight,
        scaleType: payload.yAxisScaleType,
        step: payload.yAxisStep,
        interpolator: payload.yAxisInterpolator
    });

    if (!payload.yAxisInterpolator) {
        console.log("reverse");
        scale = reverseDomain(scale);
    }

    return scale;

}
