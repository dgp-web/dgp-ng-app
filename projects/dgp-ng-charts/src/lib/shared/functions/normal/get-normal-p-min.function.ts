import { Many } from "data-modeling";
import { defaultProbabilityChartPMin } from "../../constants";
import { getComputedNormalPMin } from "./get-computed-normal-p-min.function";

export function getNormalPMin(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMin = defaultProbabilityChartPMin;
    if (!payload) return pMin;

    const P = payload.P;
    if (!P) return pMin;

    const computedPMin = getComputedNormalPMin({P});
    if (computedPMin < pMin) pMin = computedPMin;

    return pMin;

}
