import { Many } from "data-modeling";
import { defaultProbabilityChartPMin } from "../../constants";

export function getProbabilityChartPMin(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMin = defaultProbabilityChartPMin;
    if (!payload) return pMin;

    const P = payload.P;
    if (!P) return pMin;

    const computedPMin1 = Math.min(...P);
    const exponent = Math.ceil(Math.log10(P.length));
    const computedPMin = 1 / (10 ** exponent);

    if (computedPMin < pMin) pMin = computedPMin;

    return pMin;

}
