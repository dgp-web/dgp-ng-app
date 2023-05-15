import { getGaussianError } from "./get-gaussian-error.function";

export function getGaussianCumulativeDistribution(payload: {
    readonly x: number;
    readonly median: number;
    readonly variance: number;
}): number {
    const x = payload.x;

    const median = payload.median;
    const variance = payload.variance;

    return 1 / 2 * (1 + getGaussianError((x - median) / Math.sqrt(2 * variance)));

}
