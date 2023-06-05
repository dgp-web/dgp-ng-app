import { Many } from "data-modeling";
import { Dot } from "../../connected-scatter-plot/models";
import { toPercent } from "./to-percent.function";

export function toProbabilityChartDots(payload: {
    readonly X: Many<number>;
    readonly P: Many<number>;
    readonly labels?: Many<string>;
}): Many<Dot> {

    const X = payload.X;
    const P = payload.P;
    const labels = payload.labels;

    return X.map((x, index) => {
        const p = P[index];
        const label = labels[index];
        const y = toPercent(p);
        return {x, y, label} as Dot;
    });

}
