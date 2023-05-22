import { ConnectedScatterPlot, createWeibullConnectedScatterGroup, createWeibullPlot, Shape, WeibullParameters } from "dgp-ng-charts";
import * as weibull from "@stdlib/random-base-weibull";
import { Many } from "data-modeling";

export interface WeibullDataConfig extends WeibullParameters {
    readonly n: number;
    readonly colorHex?: string;
}

export function createTestWeibullPlot(payload: Many<WeibullDataConfig>): ConnectedScatterPlot {
    return createWeibullPlot({
        model: payload.map(x => {

            const rdm = weibull.factory(x.shape, x.scale);
            const values = Array.from({length: x.n}, () => rdm());

            return createWeibullConnectedScatterGroup({values}, {
                colorHex: x.colorHex || "#ff000066",
                shape: Shape.Cross
            });
        })
    });
}
