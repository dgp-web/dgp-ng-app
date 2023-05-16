import * as d3 from "d3";
import { getWeibullQuantile } from "./get-weibull-quantile.function";

export function createWeibullInterpolator(payload?: {}): d3.InterpolatorFactory<number, number> {
    return (a: number, b: number) => {

        /**
         * a and b are the range boundaries
         *
         * We compute the visual middle between them which is where our median value should be placed.
         */
        const range = Math.abs(a - b);

        const percentile01 = getWeibullQuantile({p: 0.01});
        const percentile99 = getWeibullQuantile({p: 0.99});

        const totalDistance = Math.abs(percentile01 - percentile99);

        return (t: number) => {
            /**
             * Note that the value t already gets transformed by d3.
             *
             * It's the computed distance of an input value between the domain boundaries.
             *
             * For us, this means that values between 0 and 100 are transformed back into values between 0 and 1.
             */
            const p = t;
            const percentile = getWeibullQuantile({p});
            const distance = Math.abs(percentile - percentile99);
            const share = distance / totalDistance;

            return share * range;
        };
    };

}
