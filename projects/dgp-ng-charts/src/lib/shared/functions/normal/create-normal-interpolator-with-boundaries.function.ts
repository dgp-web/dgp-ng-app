import { Many } from "data-modeling";
import * as d3 from "d3";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";
import { interpolateLinearly } from "../interpolate-linearly.function";
import { computeDistance } from "../compute-distance.function";
import { reverseLinearInterpolation } from "../reverse-linear-interpolation.function";
import { createNormalInterpolator } from "./create-normal-interpolator.function";

export function createNormalInterpolatorWithBoundaries(payload: {
    readonly P?: Many<number>;
    /**
     * Configured domain limits
     */
    readonly pMin: number;
    readonly pMax: number;
}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;
    const pMin = payload.pMin;
    const pMax = payload.pMax;

    const pRefMin = getProbabilityChartPMin({P});
    const pRefMax = getProbabilityChartPMax({P});

    console.log("pMin, pMax, pRefMin, pRefMax", pMin, pMax, pRefMin, pRefMax);

    const tPMin = interpolateLinearly({value: pMin, min: pRefMin, max: pRefMax});
    const tPMax = interpolateLinearly({value: pMax, min: pRefMin, max: pRefMax});

    console.log("tPMin, tPMax", tPMin, tPMax);

    return (rangeStart: number, rangeTarget: number) => {

        const getPxOnRefScale = createNormalInterpolator({P})(rangeStart, rangeTarget);

        // TODO: THis computation or rather the one of tPMin is not correct
        const pMinYPx = getPxOnRefScale(tPMin);
        const pMaxYPx = getPxOnRefScale(tPMax);

        console.log("pMinYPx, pMaxYPx", pMinYPx, pMaxYPx);

        const yPxDistance = computeDistance({target: pMinYPx, start: pMaxYPx});

        const yRefPxDistance = computeDistance({target: rangeTarget, start: rangeStart});
        const factor = yRefPxDistance / yPxDistance;

        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = reverseLinearInterpolation({value: t, min: pMin, max: pMax});
            const pRef = interpolateLinearly({value: p, min: pRefMin, max: pRefMax});

            const yPxOnRefScale = getPxOnRefScale(pRef);

            const yPxDistanceOnRefScale = computeDistance({target: yPxOnRefScale, start: pMaxYPx});

            return yPxDistanceOnRefScale * factor;
        };
    };

}
