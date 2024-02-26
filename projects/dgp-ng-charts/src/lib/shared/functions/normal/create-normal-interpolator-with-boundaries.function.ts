import { Many } from "data-modeling";
import * as d3 from "d3";
import { getNormalPMin } from "./get-normal-p-min.function";
import { getNormalPMax } from "./get-normal-p-max.function";
import { computeT } from "../compute-t.function";
import { computeDistance } from "../compute-distance.function";
import { reverseTComputation } from "../reverse-t-computation.function";
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

    const pRefMin = getNormalPMin({P});
    const pRefMax = getNormalPMax({P});

    const tPMin = computeT({value: pMin, min: pRefMin, max: pRefMax});
    const tPMax = computeT({value: pMax, min: pRefMin, max: pRefMax});

    return (rangeStart: number, rangeTarget: number) => {

        const getPxOnRefScale = createNormalInterpolator({P})(rangeStart, rangeTarget);

        const pMinYPx = getPxOnRefScale(tPMin);
        const pMaxYPx = getPxOnRefScale(tPMax);

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
            const p = reverseTComputation({value: t, min: pMin, max: pMax});

            if (p === pMin) return rangeTarget;
            if (p === pMax) return rangeStart;

            const tPRef = computeT({value: p, min: pRefMin, max: pRefMax});

            const yPxOnRefScale = getPxOnRefScale(tPRef);

            const yPxDistanceOnRefScale = computeDistance({target: pMinYPx, start: yPxOnRefScale});
            const yPxDistanceOnCurrentScale = yPxDistanceOnRefScale * factor;

            return rangeTarget - yPxDistanceOnCurrentScale;
        };
    };

}
