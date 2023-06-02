import { Many } from "data-modeling";
import * as d3 from "d3";
import { defaultProbabilityChartPMin } from "../../constants";

export function getProbabilityChartPMin(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMin = defaultProbabilityChartPMin;
    if (!payload) return pMin;

    const P = payload.P;
    if (!P) return pMin;

    if (P) {
        const computedPMin = d3.min(P);
        if (computedPMin < pMin) pMin = computedPMin;
    }

    return pMin;

}
