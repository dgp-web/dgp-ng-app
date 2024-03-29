import { computeDistance } from "./compute-distance.function";

export function reverseTComputation(payload: {
    readonly value: number;
    readonly min: number;
    readonly max: number;
}): number {

    const value = payload.value;
    const min = payload.min;
    const max = payload.max;

    const distance = computeDistance({target: max, start: min});

    return min + value * distance;
}
