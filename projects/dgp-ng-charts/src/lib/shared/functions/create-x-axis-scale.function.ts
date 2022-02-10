import { ScaleType } from "../models";
import { createCardinalAxisScale } from "./create-cardinal-axis-scale.function";

export function createXAxisScale(payload: {
    readonly dataAreaWidth: number;
    readonly xMin: number;
    readonly xMax: number;
    readonly xAxisScaleType?: ScaleType;
    readonly xAxisStep?: number;
}) {

    return createCardinalAxisScale({
        max: payload.xMax,
        min: payload.xMin,
        dataAreaSize: payload.dataAreaWidth,
        scaleType: payload.xAxisScaleType,
        step: payload.xAxisStep
    });
}
