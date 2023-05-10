import { getGaussianDensity } from "../connected-scatter-plot-labs.component";

describe(getGaussianDensity.name, () => {

    fit(`playground`, () => {

        //const payload = Array.from({length: 100}, (v, i) => i + 1);
        const payload = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

        console.log("payload", payload);

        const result = payload.map(x => getGaussianDensity({
            x, variance: 0.2, median: 0
        }));

        console.log("result", result);

        const result01 = result.map(x => 1 / x);

        console.log("result01", result01);

    });

});
