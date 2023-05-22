import { Many } from "data-modeling";
import * as d3 from "d3";
import { defaultProbabilityChartPMin } from "../../constants";

export function getProbabilityChartPMin(payload?: {
    readonly P?: Many<number>;
}): number {

    if (!payload || !payload.P) return null;

    const P = payload.P;

    let pMin = defaultProbabilityChartPMin;
    if (P) {
        const computedPMin = d3.min(P);
        if (computedPMin < pMin) pMin = computedPMin;
    }

    return pMin;

}
