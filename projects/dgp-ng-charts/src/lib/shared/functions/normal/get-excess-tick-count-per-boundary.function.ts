import { Many } from "data-modeling";
import { getNormalPBoundaryExponent } from "./get-normal-p-boundary-exponent.function";
import { normalTickCountPerBoundaryOffset } from "../../constants/normal/normal-tick-count-per-boundary-offset.constant";

export function getExcessTickCountPerBoundary(payload: {
    readonly P: Many<number>;
}): number {
    const P = payload.P;
    const PLength = P.length;

    return getNormalPBoundaryExponent({
        PLength
    }) - normalTickCountPerBoundaryOffset;
}
