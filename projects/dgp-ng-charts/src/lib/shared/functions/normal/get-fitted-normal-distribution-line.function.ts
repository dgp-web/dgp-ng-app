import { Many } from "data-modeling";
import { Dot } from "../../../connected-scatter-plot/models";
import { fitNormalDistribution } from "./fit-normal-distribution.function";
import * as d3 from "d3";
import { getNormalQuantile } from "./get-normal-quantile.function";
import { toPercent } from "../to-percent.function";

export function getFittedNormalDistributionLine(payload: {
    readonly X: Many<number>;
    readonly P: Many<number>;
    readonly totalP: Many<number>;
}): Many<Dot> {

    const X = payload.X;
    const P = payload.P;
    const totalP = payload.totalP;

    const fittedDist = fitNormalDistribution(X);

    const median = fittedDist.median;
    const variance = fittedDist.variance;

    const minP = Math.min(d3.min(totalP), 0.01);
    const maxP = Math.max(d3.max(totalP), 0.99);

    const quantileMin = getNormalQuantile({median, variance, p: minP});
    const quantileMax = getNormalQuantile({median, variance, p: maxP});

    const fittedLine: Many<Dot> = [{
        x: quantileMin,
        y: toPercent(minP)
    }, {
        x: quantileMax,
        y: toPercent(maxP)
    }];

    return fittedLine;

}
