import { Many } from "data-modeling";
import { fitWeibullDistribution } from "./fit-weibull-distribution.function";
import * as d3 from "d3";
import { getWeibullQuantile } from "./get-weibull-quantile.function";
import { Dot } from "../../../connected-scatter-plot/models";
import { fromPercent } from "../from-percent.function";
import { toPercent } from "../to-percent.function";

export function getFittedWeibullDistributionLine(payload: {
    readonly X: Many<number>;
    readonly Y: Many<number>;
}): Many<Dot> {

    const X = payload.X;
    const Y = payload.Y;

    const fittedDist = fitWeibullDistribution({
        x: X,
        y: Y.map(fromPercent).map(yv => getWeibullQuantile({p: yv, shape: 1, scale: 1}))
    });

    const shape = fittedDist.shape;
    const scale = fittedDist.scale;

    const minP = fromPercent(d3.min(Y));
    const maxP = fromPercent(d3.max(Y));

    const quantileMin = getWeibullQuantile({
        shape, scale, p: minP
    });

    const quantileMax = getWeibullQuantile({
        shape, scale, p: maxP
    });

    const fittedLine: Many<Dot> = [{
        x: quantileMin,
        y: toPercent(minP)
    }, {
        x: quantileMax,
        y: toPercent(maxP)
    }];

    return fittedLine;

}
