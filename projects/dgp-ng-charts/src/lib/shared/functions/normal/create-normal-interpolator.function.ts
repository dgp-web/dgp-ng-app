import * as d3 from "d3";
import { getGaussianQuantile } from "./get-gaussian-quantile.function";
import { Many } from "data-modeling";

export function createNormalInterpolator(payload?: {
    readonly pValues?: Many<number>;
}): d3.InterpolatorFactory<number, number> {
    const pValues = payload.pValues;
    /**
     * The axis scale uses a distribution with median 0 which helps us with computing regular distances
     * in both directions. p of 0.5 results in 0 which should be the middle of the range.
     */
    const median = 0;
    /**
     * We can use the variance included in the data or 1 which makes us work with the standard normal distribution.
     */
        // const variance = d3.variance(values);
    const variance = 1;

    let pMin = 0.01;
    if (pValues) pMin = d3.min(pValues);

    let pMax = 0.99;
    if (pValues) pMax = d3.max(pValues);

    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = Math.abs(a - b);

        const minQuantile = getGaussianQuantile({variance, median, p: pMin});
        const maxQuantile = getGaussianQuantile({variance, median, p: pMax});

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
            const quantile = getGaussianQuantile({variance, median, p});
            const distance = Math.abs(quantile - maxQuantile);
            const share = distance / totalDistance;

            return share * range;
        };
    };

}
