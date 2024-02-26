import { Many } from "data-modeling";
import { defaultProbabilityChartPMax } from "../../constants";

export function getProbabilityChartPMax(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMax = defaultProbabilityChartPMax;
    if (!payload) return pMax;

    const P = payload.P;
    if (!P) return pMax;

    const computedPMax1 = Math.max(...P);
    const exponent = Math.ceil(Math.log10(P.length));
    const computedPMax = 1 - (1 / (10 ** exponent));
    
    if (computedPMax > pMax) pMax = computedPMax;

    return pMax;

}
