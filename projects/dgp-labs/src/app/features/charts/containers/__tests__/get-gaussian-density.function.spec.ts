import {
    getGaussianCumulativeDistribution,
    getGaussianProbabilityDensity,
    getGaussianQuantile,
    getMedianRank
} from "../connected-scatter-plot-labs.component";
import * as d3 from "d3";
import * as _ from "lodash";

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

        fit(`getGaussianQuantile:gaussian`, () => {

            const rdm = d3.randomNormal(0, 1);

            const payload = _.sortBy(Array.from({length: 101}, (x, i) => rdm()));
            const median = d3.median(payload);
            const variance = d3.variance(payload);

            console.log("payload", payload);
            console.log("median", median);
            console.log("variance", variance);

            const n = payload.length;

            const p = payload.map((pValue, index) => getMedianRank({
                n, i: index + 1
            }));

            console.log("p", p);

            const quantiles = p.map((pValue, index) => getGaussianQuantile({
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

    });

});
