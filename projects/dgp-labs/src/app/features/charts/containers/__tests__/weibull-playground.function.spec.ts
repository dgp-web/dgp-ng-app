import * as d3 from "d3";
import * as _ from "lodash";
import { getMedianRank } from "dgp-ng-charts";
import {
    createWeibullInterpolator
} from "../../../../../../../dgp-ng-charts/src/lib/shared/functions/weibull/create-weibull-interpolator.function";
import { getWeibullQuantile } from "../../../../../../../dgp-ng-charts/src/lib/shared/functions/weibull/get-weibull-quantile.function";

import {
    fitWeibullDistribution
} from "../../../../../../../dgp-ng-charts/src/lib/shared/functions/weibull/fit-weibull-distribution.function";

export function createWeibullScale(payload: {
    readonly dataAreaSize: number;
}) {
    const dataAreaSize = payload.dataAreaSize;

    const interpolate = createWeibullInterpolator({});

    return d3.scaleLinear()
        /**
         * The domain is chosen between 0 and 100 instead of between 0 and 1.
         */
        .domain([0, 100])
        .interpolate(interpolate)
        .range([0, dataAreaSize]);
}

describe("Weibull", () => {

    describe(getWeibullQuantile.name, () => {

        fit(`Weibull quantile`, () => {

            const payload = [0.01, 0.632, 0.99];
            const p = payload.map((x, index) => getMedianRank({
                i: index + 1,
                n: payload.length
            }));

            payload.forEach(pValue => {
                const quantile = getWeibullQuantile({
                    p: pValue
                });
                console.log("p", pValue, "quantile", quantile);
            });

        });

        describe(`scale`, () => {

            it(`playground`, () => {

                const rdm = d3.randomNormal(0, 1);
                const values = _.sortBy(Array.from({length: 15}, (x, i) => rdm()));

                const median = d3.median(values);
                console.log("median", median);
                const variance = d3.variance(values);
                console.log("variance", variance, " Note: 1 may be use instead");
                const min = d3.min(values);
                console.log("min", min);
                const max = d3.max(values);
                console.log("max", max);

                const scale = createWeibullScale({
                    dataAreaSize: 400,
                });

                values.forEach((x, index) => {
                    /**
                     * We're going to use the inverse CDF, so we need probabilities between 0 and 1.
                     *
                     * The median rank can fulfill that.
                     */
                    const medianRank = getMedianRank({
                        i: index + 1,
                        n: values.length
                    });

                    /**
                     * In order to display the rank in percent, we multiply it by 100.
                     */
                    const medianRankInPercent = medianRank * 100;

                    /**
                     * This resolved rank gets transformed into a visual range by our scale.
                     */
                    const computedRange = scale(medianRankInPercent);
                    console.log("median rank", medianRankInPercent, "computedRange", computedRange);
                });

                const tickValues = [1, 2, 3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 99];
                const axis = d3.axisLeft(scale)
                    .tickValues(tickValues);

            });

        });
        describe(`fitWeibullDistribution`, () => {

            fit(`playground`, () => {

                const rdm = d3.randomNormal(50, 15);
                const x = _.sortBy(Array.from({length: 100}, (noop, i) => rdm())
                    .map(v => Math.log(v)));

                const y = x.map((noop, index) => {
                    /**
                     * We're going to use the inverse CDF, so we need probabilities between 0 and 1.
                     *
                     * The median rank can fulfill that.
                     */
                    const p = getMedianRank({
                        i: index + 1,
                        n: x.length
                    });

                    return getWeibullQuantile({p});

                });

                console.log("values", x);

                const fittedRant = fitWeibullDistribution({quantiles: y, logX: x});

                console.log(JSON.stringify(fittedRant));


            });
        });

    });
});
