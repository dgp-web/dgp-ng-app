import { Many } from "data-modeling";
import { toPercent } from "../to-percent.function";
import * as d3 from "d3";

export const defaultNormalYAxisTickValues = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99];

export function createNormalYAxisTickValues(payload: {
    readonly P: Many<number>;
}): Many<number> {

    const resolvedP = payload.P.map(toPercent);

    const result = [...defaultNormalYAxisTickValues];

    const min = d3.min(resolvedP);
    const max = d3.max(resolvedP);

    if (min < result[0]) {
        result.splice(0, 0, min);
    }

    if (max > result[result.length - 1]) {
        result.splice(result.length - 1, 1, max);
    }

    return result;
}
