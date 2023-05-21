import { ConnectedScatterPlot, createWeibullConnectedScatterGroup, createWeibullPlot, WeibullParameters } from "dgp-ng-charts";
import * as weibull from "@stdlib/random-base-weibull";

export function createTestWeibullPlot(payload: {
    readonly n: number;
} & WeibullParameters): ConnectedScatterPlot {

    const n = payload.n;
    const scale = payload.scale;
    const shape = payload.shape;

    const rdm = weibull.factory(shape, scale);
    const values = Array.from({length: n}, () => rdm());
    /*const rdm01 = weibull.factory(3, 2);
    const values01 = Array.from({length: n}, () => rdm());*/

    return createWeibullPlot({
        model: [
            createWeibullConnectedScatterGroup({values}),
            //createWeibullConnectedScatterGroup({values: values01}, {colorHex: "#0000ff66"})
        ]
    });
}
