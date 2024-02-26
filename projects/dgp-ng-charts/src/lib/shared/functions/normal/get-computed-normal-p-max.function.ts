import { Many } from "data-modeling";
import { getComputedNormalPMin } from "./get-computed-normal-p-min.function";

export function getComputedNormalPMax(payload: {
    readonly P: Many<number>;
}): number {
    const pMin = getComputedNormalPMin(payload);

    return 1 - pMin;
}
