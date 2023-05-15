/**
 * References
 * - https://de.wikipedia.org/wiki/Normalverteilung
 * - https://en.wikipedia.org/wiki/Normal_distribution
 */
export function getGaussianProbabilityDensity(payload: {
    readonly x: number;
    readonly median: number;
    readonly variance: number;
}): number {

    const x = payload.x;

    const median = payload.median;
    const variance = payload.variance;

    const scale = Math.sqrt(variance);

    return 1 / Math.sqrt(2 * Math.PI * variance) * Math.exp(-1 / 2 * (((x - median) / scale) ** 2));

}

