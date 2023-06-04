export function computeDistance(payload: {
    readonly target: number;
    readonly start: number;
}): number {

    const target = payload.target;
    const start = payload.start;

    return target - start;

}
