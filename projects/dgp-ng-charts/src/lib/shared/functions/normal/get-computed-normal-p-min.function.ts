import { Many } from "data-modeling";
import { getNormalPBoundaryExponent } from "./get-normal-p-boundary-exponent.function";
import { getPValueByExponent } from "./get-p-value-by-exponent.function";

export function getComputedNormalPMin(payload: {
    readonly P: Many<number>;
}): number {
    const P = payload.P;

    const exponent = getNormalPBoundaryExponent({PLength: P.length});
    return getPValueByExponent({exponent});
}
