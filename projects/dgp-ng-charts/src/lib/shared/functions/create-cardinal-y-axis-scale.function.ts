import { ScaleType } from "../models";
import { reverseDomain } from "./reverse-domain.function";
import { createCardinalAxisScale } from "./create-cardinal-axis-scale.function";

export function createYAxisScale(payload: {
    readonly dataAreaHeight: number;
    readonly yMin: number;
    readonly yMax: number;
    readonly yAxisStep?: number;
    readonly yAxisScaleType?: ScaleType;
}) {

    let scale = createCardinalAxisScale({
        max: payload.yMax,
        min: payload.yMin,
        dataAreaSize: payload.dataAreaHeight,
        scaleType: payload.yAxisScaleType,
        step: payload.yAxisStep
    });

    scale = reverseDomain(scale);

    return scale;

}
