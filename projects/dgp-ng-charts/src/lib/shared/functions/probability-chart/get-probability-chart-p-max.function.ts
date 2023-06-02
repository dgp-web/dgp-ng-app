import { Many } from "data-modeling";
import { defaultProbabilityChartPMax } from "../../constants";

export function getProbabilityChartPMax(payload?: {
    readonly P?: Many<number>;
}): number {

    let pMax = defaultProbabilityChartPMax;
    if (!payload) return pMax;

    const P = payload.P;
    if (!P) return pMax;

    pMax = Math.max(...P);

    return pMax;

}
