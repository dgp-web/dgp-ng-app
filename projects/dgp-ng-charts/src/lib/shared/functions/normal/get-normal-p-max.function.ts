import { Many } from "data-modeling";
import { defaultProbabilityChartPMax } from "../../constants";
import { getComputedNormalPMax } from "./get-computed-normal-p-max.function";

export function getNormalPMax(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMax = defaultProbabilityChartPMax;
    if (!payload) return pMax;

    const P = payload.P;
    if (!P) return pMax;

    const computedPMax = getComputedNormalPMax({P});
    if (computedPMax > pMax) pMax = computedPMax;

    return pMax;

}
