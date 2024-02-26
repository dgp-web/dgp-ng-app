import { Many } from "data-modeling";
import { defaultProbabilityChartPMin } from "../../constants";
import { getProbabilityChartPBoundaryExponent } from "./get-probability-chart-p-boundary-exponent.function";
import { getPValueByExponent } from "./get-p-value-by-exponent.function";

export function getProbabilityChartPMin(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMin = defaultProbabilityChartPMin;
    if (!payload) return pMin;

    const P = payload.P;
    if (!P) return pMin;

    const exponent = getProbabilityChartPBoundaryExponent({PLength: P.length});
    const computedPMin = getPValueByExponent({exponent});

    if (computedPMin < pMin) pMin = computedPMin;

    return pMin;

}
