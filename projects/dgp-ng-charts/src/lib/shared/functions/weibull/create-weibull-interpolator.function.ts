import * as d3 from "d3";
import { getWeibullQuantile } from "./get-weibull-quantile.function";
import { Many } from "data-modeling";
import { defaultWeibullParameters } from "../../constants";

export function createWeibullInterpolator(payload?: {
    readonly P?: Many<number>;
}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;

    let pMin = 0.01;
    if (P) pMin = d3.min(P);

    let pMax = 0.99;
    if (P) pMax = d3.max(P);

    const scale = defaultWeibullParameters.scale;
    const shape = defaultWeibullParameters.shape;

    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = Math.abs(a - b);

        const minQuantile = getWeibullQuantile({p: pMin, scale, shape});
        const maxQuantile = getWeibullQuantile({p: pMax, scale, shape});

        const totalDistance = Math.abs(minQuantile - maxQuantile);

        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = t;
            const quantile = getWeibullQuantile({p, scale, shape});
            const distance = Math.abs(quantile - maxQuantile);
            const share = distance / totalDistance;

            return share * range;
        };
    };

}
