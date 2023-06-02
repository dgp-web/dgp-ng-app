import { Many } from "data-modeling";
import * as d3 from "d3";
import { defaultProbabilityChartPMax } from "../../constants";

export function getProbabilityChartPMax(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMax = defaultProbabilityChartPMax;
    if (!payload) return pMax;

    const P = payload.P;
    if (!P) return pMax;

    if (P) {
        const computedPMax = d3.max(P);
        if (computedPMax > pMax) pMax = computedPMax;
    }

    return pMax;

}
