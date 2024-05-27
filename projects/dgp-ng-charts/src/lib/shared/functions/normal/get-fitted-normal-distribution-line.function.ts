import { Many } from "data-modeling";
import { Dot } from "../../../connected-scatter-plot/models";
import { fitNormalDistribution } from "./fit-normal-distribution.function";
import { getNormalQuantile } from "./get-normal-quantile.function";
import { toPercent } from "../to-percent.function";

export function getFittedNormalDistributionLine(payload: {
    readonly X: Many<number>;
    readonly totalPMin: number;
    readonly totalPMax: number;
}): Many<Dot> {

    const X = payload.X;
    const totalPMin = payload.totalPMin;
    const totalPMax = payload.totalPMax;

    const fittedDist = fitNormalDistribution(X);

    const median = fittedDist.median;
    const variance = fittedDist.variance;

    const minP = Math.min(totalPMin, 0.01);
    const maxP = Math.max(totalPMax, 0.99);

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
