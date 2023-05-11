import {
    getGaussianCumulativeDistribution,
    getGaussianProbabilityDensity,
    getGaussianQuantile
} from "../connected-scatter-plot-labs.component";

describe("gaussian", () => {

    describe(getGaussianProbabilityDensity.name, () => {

        it(`playground`, () => {

            //const payload = Array.from({length: 100}, (v, i) => i + 1);
            const payload = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

            console.log("payload", payload);

            const result = payload.map(x => getGaussianProbabilityDensity({
                x, variance: 0.2, median: 0
            }));

            console.log("result", result);

            const result01 = result.map(x => 1 / x);

            console.log("result01", result01);

        });

    });

    describe(getGaussianCumulativeDistribution.name, () => {

        it(`playground`, () => {

            //const payload = Array.from({length: 100}, (v, i) => i + 1);
            const payload = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

            console.log("payload", payload);

            const result = payload.map(x => getGaussianCumulativeDistribution({
                x, variance: 0.2, median: 0
            }));

            console.log("result", result);

            const result01 = result.map(x => 1 / x);

            console.log("result01", result01);

        });

    });

    describe(getGaussianQuantile.name, () => {

        it(`playground`, () => {

            const payload = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
            //const payload = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
            // const payload = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

            console.log("payload", payload);

            const result = payload.map(x => getGaussianQuantile({
                variance: 0.2,
                median: 0,
                p: getGaussianCumulativeDistribution({
                    x, variance: 0.2, median: 0
                })
            }));

            console.log("result", result);

            const result01 = result.map(x => 1 / x);

            console.log("result01", result01);

        });

    });

});
