import { Many } from "data-modeling";
import { fitWeibullDistribution } from "./fit-weibull-distribution.function";
import * as d3 from "d3";
import { getWeibullQuantile } from "./get-weibull-quantile.function";
import { Dot } from "../../../connected-scatter-plot/models";

export function getFittedWeibullDistributionLine(payload: {
    readonly X: Many<number>;
    readonly Y: Many<number>;
}): Many<Dot> {

    const X = payload.X;
    const Y = payload.Y;

    const fittedDist = fitWeibullDistribution({
        x: X,
        y: Y.map(yv => yv / 100).map(yv => getWeibullQuantile({p: yv, shape: 1, scale: 1}))
    });

    const shape = fittedDist.shape;
    const scale = fittedDist.scale;

    const minP = d3.min(Y) / 100;
    const maxP = d3.max(Y) / 100;

    const quantileMin = getWeibullQuantile({
        shape, scale, p: minP
    });

    const quantileMax = getWeibullQuantile({
        shape, scale, p: maxP
    });

    const fittedLine: Many<Dot> = [{
        x: quantileMin,
        y: minP * 100
    }, {
        x: quantileMax,
        y: maxP * 100
    }];

    return fittedLine;

}
