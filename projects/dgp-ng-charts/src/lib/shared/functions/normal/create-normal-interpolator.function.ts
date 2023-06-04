import * as d3 from "d3";
import { Many } from "data-modeling";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getNormalYCoordinate } from "./get-normal-y-coordinate.function";

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
        a: yMin,
        b: yMax
    });

    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = computeDistance({a: b, b: a});

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
                a: y,
                b: yMax
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


    /**
     * TODO: since we use this for computing the reference distance, we should refer it to a fixed distance and NOT between
     * the computed min and max; this leads to wrong spacing since pMin is not as far away from 0.01 as pMax is from 0.99
     */
    const pRefMin = getProbabilityChartPMin({P});
    const pRefMax = getProbabilityChartPMax({P});

    const yRefMin = getNormalYCoordinate({p: pRefMin});
    const yRefMax = getNormalYCoordinate({p: pRefMax});


    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = computeDistance({a: b, b: a});
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

        const yPxLength = computeDistance({a: yMinPx, b: yMaxPx});

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
                a: yPxOnRefScale,
                b: yMaxPx
            });

            return yPxDistanceOnCurrentScale * factor;
        };
    };

}

export function computeDistance(payload: {
    readonly a: number;
    readonly b: number;
}): number {

    const a = payload.a;
    const b = payload.b;

    return a - b;

}

export function interpolateLinearly(payload: {
    readonly value: number;
    readonly min: number;
    readonly max: number;
}): number {

    const value = payload.value;
    const min = payload.min;
    const max = payload.max;

    const valueDistance = computeDistance({a: value, b: min});
    const refDistance = computeDistance({a: max, b: min});

    return valueDistance / refDistance;
}

export function reverseLinearInterpolation(payload: {
    readonly value: number;
    readonly min: number;
    readonly max: number;
}): number {

    const value = payload.value;
    const min = payload.min;
    const max = payload.max;

    const distance = computeDistance({a: max, b: min});

    return value * distance;
}

// DUMP FROM OLD IMPLEMENTATION
/*
export function createNormalInterpolator(payload: {
    readonly P?: Many<number>;
    /!**
     * Configured domain limits
     *!/
    readonly pMin?: number;
    readonly pMax?: number;
} = {}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;

    /!**
     * TODO: since we use this for computing the reference distance, we should refer it to a fixed distance and NOT between
     * the computed min and max; this leads to wrong spacing since pMin is not as far away from 0.01 as pMax is from 0.99
     *!/
    const pRefMin = getProbabilityChartPMin({P});
    const pRefMax = getProbabilityChartPMax({P});

    console.log("pRefMin", pRefMin);
    console.log("pRefMax", pRefMax);
    /!**
     * Compute length of reference domain = yRefDomainLength
     *!/
    const yRefMin = getNormalYCoordinate({p: pRefMin});
    const yRefMax = getNormalYCoordinate({p: pRefMax});

    const yRefDomainLength = Math.abs(yRefMin - yRefMax);

    let pMin = payload.pMin;
    if (isNullOrUndefined(pMin)) pMin = pRefMin;

    let pMax = payload.pMax;
    if (isNullOrUndefined(pMax)) pMax = pRefMax;

    console.log("pMin", pMin);
    console.log("pMax", pMax);

    return (a: number, b: number) => {

        /!**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         *!/
        const range = Math.abs(a - b);

        const yRefPxLength = range;
        console.log("yRefPxLength", yRefPxLength);

        /!**
         * Compute length of current domain = yDomainLength
         *!/
        /!**
         * yMin
         *!/
        const yMin = getNormalYCoordinate({p: pMin});
        console.log("yMin", yMin);
        const yMinDistance = Math.abs(yMin - yRefMax);
        console.log("yMinDistance", yMinDistance);
        const yMinShare = yMinDistance / yRefDomainLength;
        console.log("yMinShare", yMinShare);
        const yMinPx = yMinShare * yRefPxLength;
        console.log("yMinPx", yMinPx);

        /!**
         * yMaxPx
         *!/
        const yMax = getNormalYCoordinate({p: pMax});
        const yMaxDistance = Math.abs(yMax - yRefMax);
        const yMaxShare = yMaxDistance / yRefDomainLength;
        const yMaxPx = yMaxShare * yRefPxLength;
        console.log("yMaxPx", yMaxPx);

        const yPxLength = Math.abs(yMinPx - yMaxPx);

        console.log("yPxLength", yPxLength);
        const factor = yRefPxLength / yPxLength;


        // TODO: Compute length of current yDomainLength: y(pMax) - y(pMin)
        // TODO: Compute length of reference yRefDomainLength: yRef(pRefMax) - yRef(pRefMin)
        // TODO: Compute factor: yRefDomainLength / yDomainLength

        /!**
         * TODO: When adjusting the domain, t is wrongly computed in relation to its bounds and NOT against a range between 0 and 1 or between 0 and 100
         *!/
        return (t: number) => {
            /!**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             *!/
                // reverse linear interpolation: t * (pMax - pMin) = p
            const p = reverseLinearInterpolation({value: t, min: pMin, max: pMax});

            // compute pixel position on reference scale: yRef(p)
            const yRef = getNormalYCoordinate({p});
            const yRefDistance = Math.abs(yRef - yRefMax);
            const yRefShare = yRefDistance / yRefDomainLength;
            const yRefPx = yRefShare * range;

            // compute pixel delta from y(pMax) - y(p)
            const yPxDistance = Math.abs(yRefPxLength - yRefPx);

            // multiply pixel delta with factor
            return yPxDistance * factor;

            /!*if (p === pRefMin) return b;
            if (p === pRefMax) return a;*!/

            /!*   const y = getNormalYCoordinate({p});
               const distance = Math.abs(y - yRefMax);
               const share = distance / yRefDomainLength;

               return share * range;*!/
        };
    };

}

export function reverseLinearInterpolation(payload: {
    readonly value: number;
    readonly min: number;
    readonly max: number;
}): number {

    const value = payload.value;
    const min = payload.min;
    const max = payload.max;

    return value * Math.abs(max - min);

}
*/
