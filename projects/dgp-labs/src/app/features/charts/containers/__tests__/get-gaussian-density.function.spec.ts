import {
    getGaussianCumulativeDistribution,
    getGaussianProbabilityDensity,
    getGaussianQuantile
} from "../connected-scatter-plot-labs.component";
import * as d3 from "d3";

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

        fit(`getGaussianQuantile`, () => {

            //const payload = [1, 2, 3, 4, 5, 6, 7];
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

            const result = p.map(pValue => getGaussianQuantile({
                variance,
                median,
                p: pValue
            }));

            console.log("quantiles", result);

        });

    });

});
