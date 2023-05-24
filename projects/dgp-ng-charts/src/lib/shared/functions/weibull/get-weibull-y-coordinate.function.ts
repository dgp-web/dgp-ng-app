/**
 * ln(-ln(1 - p))
 * ln(lambda * ((-ln(1 - p)) ** (1/shape)))
 *
 * References
 * - https://en.wikipedia.org/wiki/Weibull_distribution
 */
export function getWeibullYCoordinate(payload: {
    readonly p: number;
}) {
    const p = payload.p;

    return Math.log(((-Math.log(1 - p))));
}

