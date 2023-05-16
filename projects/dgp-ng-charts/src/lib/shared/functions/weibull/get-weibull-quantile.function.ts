/**
 * ln(-ln(1 - p))
 *
 * References
 * - https://en.wikipedia.org/wiki/Weibull_distribution
 */
export function getWeibullQuantile(payload: {
    readonly p: number;
}) {
    const p = payload.p;

    return Math.log(-Math.log(1 - p));
}
