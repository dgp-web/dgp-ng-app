import { Many } from "data-modeling";
import { fitWeibullDistribution } from "./fit-weibull-distribution.function";
import { Dot } from "../../../connected-scatter-plot/models";
import { toPercent } from "../to-percent.function";
import { toWeibullYCoordinate } from "./to-weibull-y-coordinate.function";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";
import { getWeibullQuantile } from "./get-weibull-quantile.function";

export function getFittedWeibullDistributionLine(payload: {
    /**
     * X and P values of a current series
     */
    readonly X: Many<number>;
    readonly P: Many<number>;
    /**
     * All P values so we can determine global boundaries that are needed for drawing
     */
    readonly totalP: Many<number>;
}): Many<Dot> {

    const X = payload.X;
    const P = payload.P;
    const totalP = payload.totalP;

    const fittedDist = fitWeibullDistribution({
        X,
        quantiles: P.map(toWeibullYCoordinate())
    });

    const shape = fittedDist.shape;
    const scale = fittedDist.scale;

    const minP = getProbabilityChartPMin({P: totalP});
    const maxP = getProbabilityChartPMax({P: totalP});

    const quantileMin = getWeibullQuantile({shape, scale, p: minP});
    const quantileMax = getWeibullQuantile({shape, scale, p: maxP});

    const fittedLine: Many<Dot> = [{
        x: quantileMin,
        y: toPercent(minP)
    }, {
        x: quantileMax,
        y: toPercent(maxP)
    }];

    return fittedLine;

}
