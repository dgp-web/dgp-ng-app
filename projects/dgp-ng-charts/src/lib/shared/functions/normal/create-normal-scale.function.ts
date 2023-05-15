import { Many } from "data-modeling";
import { createNormalInterpolator } from "./create-normal-interpolator.function";
import * as d3 from "d3";

export function createNormalScale(payload: {
    readonly values: Many<number>;
    readonly dataAreaSize: number;
}) {
    const values = payload.values;
    const dataAreaSize = payload.dataAreaSize;

    const interpolate = createNormalInterpolator({values});

    return d3.scaleLinear()
        /**
         * The domain is chosen between 0 and 100 instead of between 0 and 1.
         */
        .domain([0, 100])
        .interpolate(interpolate)
        .range([0, dataAreaSize]);
}
