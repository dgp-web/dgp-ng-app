import { Many } from "data-modeling";

/**
 * Helper function to compute parameter sigma2 for the Normal
 */
export function estimateVariance(data: Many<number>, mu: number) {
    let sumOfSquaredDiffs = 0;
    const n = data.length;
    for (let i = 0; i < n; i++) {
        const squaredDiff = Math.pow(data[i] - mu, 2);
        sumOfSquaredDiffs += squaredDiff;
    }
    return sumOfSquaredDiffs / n;
}
