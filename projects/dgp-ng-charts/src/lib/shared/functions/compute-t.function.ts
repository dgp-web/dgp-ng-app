import { computeDistance } from "./compute-distance.function";

export function computeT(payload: {
    readonly value: number;
    readonly min: number;
    readonly max: number;
}): number {

    const value = payload.value;
    const min = payload.min;
    const max = payload.max;

    const valueDistance = computeDistance({target: value, start: min});
    const refDistance = computeDistance({target: max, start: min});

    return valueDistance / refDistance;
}
