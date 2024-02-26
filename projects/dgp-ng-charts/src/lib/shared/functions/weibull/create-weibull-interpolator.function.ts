import * as d3 from "d3";
import { getWeibullYCoordinate } from "./get-weibull-y-coordinate.function";
import { Many } from "data-modeling";
import { getNormalPMin } from "../normal/get-normal-p-min.function";
import { getNormalPMax } from "../normal/get-normal-p-max.function";

export function createWeibullInterpolator(payload?: {
    readonly P?: Many<number>;
}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;

    const pMin = getNormalPMin({P});
    const pMax = getNormalPMax({P});

    const minQuantile = getWeibullYCoordinate({p: pMin});
    const maxQuantile = getWeibullYCoordinate({p: pMax});

    const totalDistance = Math.abs(minQuantile - maxQuantile);

    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = Math.abs(a - b);

        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = t;
            const quantile = getWeibullYCoordinate({p});
            const distance = Math.abs(quantile - maxQuantile);
            const share = distance / totalDistance;

            return share * range;
        };
    };

}
