import * as d3 from "d3";
import { getWeibullQuantile } from "./get-weibull-quantile.function";
import { Many } from "data-modeling";
import { defaultWeibullParameters } from "../../constants";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";

export function createWeibullInterpolator(payload?: {
    readonly P?: Many<number>;
}): d3.InterpolatorFactory<number, number> {
    const P = payload.P;

    const weibullParameters = defaultWeibullParameters;

    const pMin = getProbabilityChartPMin({P});
    const pMax = getProbabilityChartPMax({P});

    const minQuantile = getWeibullQuantile({p: pMin, ...weibullParameters});
    const maxQuantile = getWeibullQuantile({p: pMax, ...weibullParameters});

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
            const quantile = getWeibullQuantile({p, ...weibullParameters});
            const distance = Math.abs(quantile - maxQuantile);
            const share = distance / totalDistance;

            return share * range;
        };
    };

}
