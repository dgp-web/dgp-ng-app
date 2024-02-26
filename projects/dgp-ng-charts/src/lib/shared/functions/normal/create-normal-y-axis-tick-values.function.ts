import { Many } from "data-modeling";
import { getExcessTickCountPerBoundary } from "./get-excess-tick-count-per-boundary.function";
import { getNormalExcessTicks } from "./get-normal-excess-ticks.function";

export const defaultNormalYAxisTickValues = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99];

export function createNormalYAxisTickValues(payload: {
    readonly P: Many<number>;
}): Many<number> {
    const P = payload.P;

    let result = defaultNormalYAxisTickValues;

    const excessTickCountPerBoundary = getExcessTickCountPerBoundary({P});
    if (excessTickCountPerBoundary > 0) {
        const excessTicks = getNormalExcessTicks({excessTickCountPerBoundary});

        result = excessTicks.lower
            .concat(result)
            .concat(excessTicks.upper);
    }

    return result;
}
