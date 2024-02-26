import { NormalExcessTicks } from "../../models";
import * as _ from "lodash";
import { normalTickCountPerBoundaryOffset } from "../../constants/normal/normal-tick-count-per-boundary-offset.constant";
import { getPValueByExponent } from "./get-p-value-by-exponent.function";
import { toPercent } from "../to-percent.function";

export function getNormalExcessTicks(payload: {
    readonly excessTickCountPerBoundary: number;
}): NormalExcessTicks {
    const excessTickCountPerBoundary = payload.excessTickCountPerBoundary;

    const lower = _.sortBy(Array.from(Array(excessTickCountPerBoundary)).map((x, i) => {
        const exponent = (i + 1) + normalTickCountPerBoundaryOffset;
        const value = getPValueByExponent({exponent});
        return toPercent(value);
    }));

    const upper = _.sortBy(lower.map(x => 100 - x));

    return {lower, upper};
}
