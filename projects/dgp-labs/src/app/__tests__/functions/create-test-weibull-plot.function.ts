import { ConnectedScatterPlot, WeibullParameters } from "dgp-ng-charts";
import * as weibull from "@stdlib/random-base-weibull";
import { createWeibullConnectedScatterGroup, createWeibullPlot } from "../../../../../dgp-ng-charts/src/lib/shared/functions";

export function createTestWeibullPlot(payload: {
    readonly n: number;
} & WeibullParameters): ConnectedScatterPlot {

    const n = payload.n;
    const scale = payload.scale;
    const shape = payload.shape;

    const rdm = weibull.factory(shape, scale);
    const values = Array.from({length: n}, () => rdm());

    return createWeibullPlot({
        model: [createWeibullConnectedScatterGroup({values})]
    });
}
