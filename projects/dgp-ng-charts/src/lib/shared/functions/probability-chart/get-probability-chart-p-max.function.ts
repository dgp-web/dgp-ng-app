import { Many } from "data-modeling";
import { defaultProbabilityChartPMax } from "../../constants";
import { getProbabilityChartPBoundaryExponent } from "./get-probability-chart-p-boundary-exponent.function";

export function getProbabilityChartPMax(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMax = defaultProbabilityChartPMax;
    if (!payload) return pMax;

    const P = payload.P;
    if (!P) return pMax;

    const exponent = getProbabilityChartPBoundaryExponent({PLength: P.length});
    const computedPMax = 1 - (1 / (10 ** exponent));

    if (computedPMax > pMax) pMax = computedPMax;

    return pMax;

}
