import * as d3 from "d3";
import { Many } from "data-modeling";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getNormalYCoordinate } from "./get-normal-y-coordinate.function";
import { computeDistance } from "../compute-distance.function";
import { interpolateLinearly } from "../interpolate-linearly.function";
import { reverseLinearInterpolation } from "../reverse-linear-interpolation.function";

export function createNormalInterpolator(payload: {
    readonly P?: Many<number>;
} = {}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;

    /**
     * TODO: since we use this for computing the reference distance, we should refer it to a fixed distance and NOT between
     * the computed min and max; this leads to wrong spacing since pMin is not as far away from 0.01 as pMax is from 0.99
     */
    const pMin = getProbabilityChartPMin({P});
    const pMax = getProbabilityChartPMax({P});

    const yMin = getNormalYCoordinate({p: pMin});
    const yMax = getNormalYCoordinate({p: pMax});

    const referenceDistance = computeDistance({
        target: yMin,
        start: yMax
    });

    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = computeDistance({target: b, start: a});

        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = t;

            if (p === pMin) return b;
            if (p === pMax) return a;

            const y = getNormalYCoordinate({p});
            const distance = computeDistance({
                target: y,
                start: yMax
            });
            const share = distance / referenceDistance;

            return share * range;
        };
    };

}

export function createNormalInterpolatorWithBoundaries(payload: {
    readonly P?: Many<number>;
    /**
     * Configured domain limits
     */
    readonly pMin: number;
    readonly pMax: number;
}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;

    const pRefMin = getProbabilityChartPMin({P});
    const pRefMax = getProbabilityChartPMax({P});

    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = computeDistance({target: b, start: a});
        const yRefPxLength = range;

        const refInterpolator = createNormalInterpolator({P})(a, b);

        const pMin = payload.pMin;
        const pMax = payload.pMax;

        const tPMin = interpolateLinearly({
            value: pMin,
            min: pRefMin,
            max: pRefMax
        });
        const tPMax = interpolateLinearly({
            value: pMax,
            min: pRefMin,
            max: pRefMax
        });

        const yMinPx = refInterpolator(tPMin);
        const yMaxPx = refInterpolator(tPMax);

        const yPxLength = computeDistance({target: yMinPx, start: yMaxPx});

        const factor = yRefPxLength / yPxLength;

        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = reverseLinearInterpolation({value: t, min: pMin, max: pMax});

            const tRef = interpolateLinearly({
                value: p,
                min: pRefMin,
                max: pRefMax
            });

            const yPxOnRefScale = refInterpolator(tRef);
            const yPxDistanceOnCurrentScale = computeDistance({
                target: yPxOnRefScale,
                start: yMaxPx
            });

            return yPxDistanceOnCurrentScale * factor;
        };
    };

}

