import { Many } from "data-modeling";
import * as d3 from "d3";
import { getGaussianQuantile } from "./get-gaussian-quantile.function";

export function createNormalInterpolator(payload: {
    readonly values: Many<number>;
}): d3.InterpolatorFactory<number, number> {

    const values = payload.values;


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

    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const halfOfRange = Math.abs(a - b) / 2;
        const middle = halfOfRange;

        const percentile01 = getGaussianQuantile({variance, median, p: 0.01});
        const percentile99 = getGaussianQuantile({variance, median, p: 0.99});

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

            /**
             * The quantile function returns positive and negative values which we need to associate with ranges.
             *
             * We divide them by the maximal or minimal values of our logical domain and then multiply the result
             * with half of the range.
             *
             * This allows us to walk the correct distance into the respective direction.
             */
            let distanceFromMiddle: number;
            if (quantile < 0) {
                distanceFromMiddle = Math.abs(quantile / percentile01) * halfOfRange;
            } else if (quantile === 0) {
                distanceFromMiddle = 0;
            } else if (quantile > 0) {
                distanceFromMiddle = -Math.abs(quantile / percentile99) * halfOfRange;
            }
            return middle + distanceFromMiddle;
        };
    };

}
