import { Many } from "data-modeling";
import * as d3 from "d3";

export function getProbabilityChartPMax(payload?: {
    readonly P?: Many<number>;
}): number {

    if (!payload || !payload.P) return null;

    const P = payload.P;

    let pMax = 0.99;
    if (P) {
        const computedPMax = d3.max(P);
        if (computedPMax > pMax) pMax = computedPMax;
    }

    return pMax;

}
