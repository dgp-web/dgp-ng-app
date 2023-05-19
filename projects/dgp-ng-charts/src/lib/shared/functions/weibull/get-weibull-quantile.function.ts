import { notNullOrUndefined } from "dgp-ng-app";

/**
 * ln(-ln(1 - p))
 *
 * References
 * - https://en.wikipedia.org/wiki/Weibull_distribution
 */
export function getWeibullQuantile(payload: {
    readonly p: number;
    readonly scale?: number;
    readonly shape?: number;
}) {
    const p = payload.p;

    let scale = 1;
    if (notNullOrUndefined(payload.scale)) scale = payload.scale;

    let shape = 1;
    if (notNullOrUndefined(payload.shape)) shape = payload.shape;

    return scale * (Math.log(-Math.log(1 - p)) ** (1 / shape));
}
