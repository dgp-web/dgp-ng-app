import { Many } from "data-modeling";
import * as d3 from "d3";
import { defaultProbabilityChartPMax } from "../../constants";

export function getProbabilityChartPMax(payload?: {
    readonly P?: Many<number>;
}): number {

    if (!payload || !payload.P) return null;

    const P = payload.P;

    let pMax = defaultProbabilityChartPMax;
    if (P) {
        const computedPMax = d3.max(P);
        if (computedPMax > pMax) pMax = computedPMax;
    }

    return pMax;

}
