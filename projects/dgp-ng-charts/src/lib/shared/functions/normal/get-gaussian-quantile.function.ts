import { getInverseGaussianError } from "./get-inverse-gaussian-error.function";

/**
 * The quantile function is the inverse of the CDF function
 *
 * References
 * - https://en.wikipedia.org/wiki/Normal_distribution
 * - https://en.wikipedia.org/wiki/Probit
 */
export function getGaussianQuantile(payload: {
    readonly median: number;
    readonly variance: number;
    readonly p: number;
}) {
    const median = payload.median;
    const variance = payload.variance;
    const scale = Math.sqrt(variance);

    const p = payload.p;

    return median + scale * Math.sqrt(2) * getInverseGaussianError(2 * p - 1);
}
