import * as d3 from "d3";
import { Many } from "data-modeling";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getNormalYCoordinate } from "./get-normal-y-coordinate.function";

// TODO: Ensure that no values <0 and >100 can be picked as boundaries
// TODO: Unit test this; it should return a valid result for the extreme values that are used for drawing the lines
export function createNormalInterpolator(payload: {
    readonly P?: Many<number>;
    // TODO: Pass configured domain limits here
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

    const referenceDistance = Math.abs(yMin - yMax);

    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = Math.abs(a - b);
        // TODO: Compute length of current yDomainLength: y(pMax) - y(pMin)
        // TODO: Compute length of reference yRefDomainLength: yRef(pRefMax) - yRef(pRefMin)
        // TODO: Compute factor: yRefDomainLength / yDomainLength

        /**
         * TODO: When adjusting the domain, t is wrongly computed in relation to its bounds and NOT against a range between 0 and 1 or between 0 and 100
         */
        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = t;
            // TODO: reverse linear interpolation: t * (pMax - pMin) = p
            // TODO: compute pixel position on reference scale: yRef(p)
            // TODO: compute pixel delta from y(pMax) - y(p)
            // TODO: multiply pixel delta with factor

            if (p === pMin) return b;
            if (p === pMax) return a;

            const y = getNormalYCoordinate({p});
            const distance = Math.abs(y - yMax);
            const share = distance / referenceDistance;

            return share * range;
        };
    };

}

