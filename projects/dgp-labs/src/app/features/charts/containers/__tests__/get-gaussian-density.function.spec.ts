import * as d3 from "d3";
import * as _ from "lodash";
import {
    createNormalScale,
    getGaussianCumulativeDistribution,
    getGaussianProbabilityDensity,
    getGaussianQuantile,
    getMedianRank
} from "dgp-ng-charts";

describe("gaussian", () => {

    describe(getGaussianProbabilityDensity.name, () => {

        it(`getGaussianProbabilityDensity`, () => {

            const payload = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

            console.log("payload", payload);

            const result = payload.map(x => getGaussianProbabilityDensity({
                x, variance: 0.2, median: 0
            }));

            console.log("result", result);

        });

    });

    describe(getGaussianCumulativeDistribution.name, () => {

        it(`getGaussianCumulativeDistribution`, () => {

            const payload = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

            console.log("payload", payload);

            const result = payload.map(x => getGaussianCumulativeDistribution({
                x, variance: 0.2, median: 0
            }));

            console.log("result", result);

        });

    });

    describe(getGaussianQuantile.name, () => {

        it(`getGaussianQuantile:probit`, () => {

            const payload = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

            console.log("payload", payload);

            const p = payload.map(x => getGaussianCumulativeDistribution({
                x, variance: 0.2, median: 0
            }));

            console.log("p", p);

            const result = p.map(pValue => getGaussianQuantile({
                variance: 0.2,
                median: 0,
                p: pValue
            }));

            console.log("quantiles", result);

        });

        it(`getGaussianQuantile`, () => {

            const payload = Array.from({length: 101}, (x, i) => i);
            const median = d3.median(payload);
            const variance = d3.variance(payload);

            console.log("payload", payload);
            console.log("median", median);
            console.log("variance", variance);

            const p = payload.map(x => getGaussianCumulativeDistribution({
                x, variance, median
            }));

            console.log("p", p);

            const quantiles = p.map(pValue => getGaussianQuantile({
                variance,
                median,
                p: pValue
            }));

            console.log("quantiles", quantiles);

            const pointsForPlot = payload.map((x, i) => {
                const y = quantiles[i];
                return {x, y};
            });

            console.log("pointsForPlot", pointsForPlot);

        });

        it(`getGaussianQuantile:gaussian`, () => {

            const rdm = d3.randomNormal(0, 1);
            const xValues = _.sortBy(Array.from({length: 101}, (x, i) => rdm()));

            const median = d3.median(xValues);
            const variance = d3.variance(xValues);

            console.log("payload", xValues);
            console.log("median", median);
            console.log("variance", variance);

            const n = xValues.length;

            const yValues = xValues.map((pValue, index) => {
                const i = index + 1;

                return getMedianRank({n, i});
            });

            console.log("p", yValues);

            const pointsForPlot = xValues.map((x, i) => {
                const y = yValues[i];
                const transformedYValue = getGaussianQuantile({
                    variance,
                    median,
                    p: y
                });
                return {x, y: transformedYValue * 100};
            });

            console.log("pointsForPlot", pointsForPlot);

        });

    });

    describe(`createGaussianScale`, () => {

        fit(`playground`, () => {

            const rdm = d3.randomNormal(0, 1);
            const values = _.sortBy(Array.from({length: 15}, (x, i) => rdm()));
            // const payload = Array.from({length: 101}, (x, i) => i);

            const median = d3.median(values);
            console.log("median", median);
            const variance = d3.variance(values);
            console.log("variance", variance, " Note: 1 may be use instead");
            const min = d3.min(values);
            console.log("min", min);
            const max = d3.max(values);
            console.log("max", max);

            const scale = createNormalScale({
                values,
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

            const tickValues = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99];
            const axis = d3.axisLeft(scale)
                .tickValues(tickValues);

        });

    });

});
