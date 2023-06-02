import { Many } from "data-modeling";
import { defaultProbabilityChartPMin } from "../../constants";

export function getProbabilityChartPMin(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMin = defaultProbabilityChartPMin;
    if (!payload) return pMin;

    const P = payload.P;
    if (!P) return pMin;

    pMin = Math.min(...P);

    return pMin;

}
