import { WeibullParameters } from "../../models";
import { notNullOrUndefined } from "dgp-ng-app";

export function getWeibullQuantile(payload: {
    readonly p: number;
} & Partial<WeibullParameters>) {
    const p = payload.p;

    let scale = 1;
    if (notNullOrUndefined(payload.scale)) scale = payload.scale;

    let shape = 1;
    if (notNullOrUndefined(payload.shape)) shape = payload.shape;

    return scale * ((-Math.log(1 - p)) ** (1 / shape));
}
