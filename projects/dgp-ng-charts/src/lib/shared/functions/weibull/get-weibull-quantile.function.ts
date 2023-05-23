import { notNullOrUndefined } from "dgp-ng-app";
import { WeibullParameters } from "../../models";

/**
 * ln(-ln(1 - p))
 * ln(lambda * ((-ln(1 - p)) ** (1/shape)))
 *
 * References
 * - https://en.wikipedia.org/wiki/Weibull_distribution
 */
export function getWeibullQuantile(payload: {
    readonly p: number;
} & Partial<WeibullParameters>) {
    const p = payload.p;

    let scale = 1;
    if (notNullOrUndefined(payload.scale)) scale = payload.scale;

    let shape = 1;
    if (notNullOrUndefined(payload.shape)) shape = payload.shape;

    return Math.log(scale * ((-Math.log(1 - p)) ** (1 / shape)));
}

export function getWeibullQuantile1(payload: {
    readonly p: number;
} & Partial<WeibullParameters>) {
    const p = payload.p;

    let scale = 1;
    if (notNullOrUndefined(payload.scale)) scale = payload.scale;

    let shape = 1;
    if (notNullOrUndefined(payload.shape)) shape = payload.shape;

    return scale * ((-Math.log(1 - p)) ** (1 / shape));
}

