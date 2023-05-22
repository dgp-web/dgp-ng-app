import { Many } from "data-modeling";
import * as d3 from "d3";

export function getProbabilityChartPMin(payload?: {
    readonly P?: Many<number>;
}): number {

    if (!payload || !payload.P) return null;

    const P = payload.P;

    let pMin = 0.01;
    if (P) {
        const computedPMin = d3.min(P);
        if (computedPMin < pMin) pMin = computedPMin;
    }

    return pMin;

}
