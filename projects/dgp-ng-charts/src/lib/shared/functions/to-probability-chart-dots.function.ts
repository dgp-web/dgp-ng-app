import { Many } from "data-modeling";
import { Dot } from "../../connected-scatter-plot/models";
import { toPercent } from "./to-percent.function";

export function toProbabilityChartDots(payload: {
    readonly X: Many<number>;
    readonly P: Many<number>;
}): Many<Dot> {

    const X = payload.X;
    const P = payload.P;

    return X.map((x, index) => {
        const p = P[index];
        const y = toPercent(p);
        return {x, y} as Dot;
    });

}
