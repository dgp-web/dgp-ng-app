import { Many } from "data-modeling";
import { getExcessTickCountPerBoundary } from "./get-excess-tick-count-per-boundary.function";
import { getNormalExcessTicks } from "./get-normal-excess-ticks.function";
import { notNullOrUndefined } from "dgp-ng-app";

export const defaultNormalYAxisTickValues = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99];

export function createNormalYAxisTickValues(payload: {
    readonly P: Many<number>;
    readonly yAxisMin?: number;
    readonly yAxisMax?: number;
}): Many<number> {
    const P = payload.P;
    const yAxisMin = payload.yAxisMin;
    const yAxisMax = payload.yAxisMax;

    let result = defaultNormalYAxisTickValues;

    const excessTickCountPerBoundary = getExcessTickCountPerBoundary({P});
    if (excessTickCountPerBoundary > 0) {
        const excessTicks = getNormalExcessTicks({excessTickCountPerBoundary});

        result = excessTicks.lower
            .concat(result)
            .concat(excessTicks.upper);
    }

    result = result.filter(tickValue => {
        if ((notNullOrUndefined(yAxisMin) && tickValue < yAxisMin)) return false;
        if ((notNullOrUndefined(yAxisMax) && tickValue > yAxisMax)) return false;
        return true;
    });

    return result;
}
