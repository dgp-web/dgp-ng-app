import { getLogTickValues } from "../../shared/function/get-log-tick-values.function";
import { computeLogGridTickValueSegment } from "./compute-log-grid-tick-value-segment.function";
import { matrixToMany } from "dgp-ng-app";

export function getMinorLogGridValues(base: number) {
    const tickValues = getLogTickValues(base);
    return tickValues
        .map(x => computeLogGridTickValueSegment(x, base))
        .reduce(matrixToMany, []);

}
