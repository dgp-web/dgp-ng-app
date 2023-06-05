import { Clamp } from "../models";
import { notNullOrUndefined } from "dgp-ng-app";

export function createClamp(payload: {
    readonly min?: number;
    readonly max?: number;
}): Clamp {

    const min = payload.min;
    const max = payload.max;

    return x => {

        if (notNullOrUndefined(min)) {
            if (x < min) return min;
        }

        if (notNullOrUndefined(max)) {
            if (x > max) return max;
        }

        return x;

    };

}
