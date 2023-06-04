export function interpolateLinearly(payload: {
    readonly value: number;
    readonly min: number;
    readonly max: number;
}): number {

    const t = payload.value;
    const a = payload.min;
    const b = payload.max;

    return a * (1 - t) + b * t;
    // TODO: Old implementation this is wrong
    /*
    const valueDistance = computeDistance({target: value, start: min});
    const refDistance = computeDistance({target: max, start: min});

    return valueDistance / refDistance;*/
}
