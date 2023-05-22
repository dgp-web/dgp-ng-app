import { Many } from "data-modeling";
import { fitWeibullDistribution } from "./fit-weibull-distribution.function";
import { getWeibullQuantile } from "./get-weibull-quantile.function";
import { Dot } from "../../../connected-scatter-plot/models";
import { toPercent } from "../to-percent.function";
import { toWeibullQuantile } from "./to-weibull-quantile.function";
import { getProbabilityChartPMin } from "../probability-chart/get-probability-chart-p-min.function";
import { getProbabilityChartPMax } from "../probability-chart/get-probability-chart-p-max.function";

export function getFittedWeibullDistributionLine(payload: {
    readonly X: Many<number>;
    readonly P: Many<number>;
}): Many<Dot> {

    const X = payload.X;
    const P = payload.P;

    const fittedDist = fitWeibullDistribution({
        X,
        quantiles: P.map(toWeibullQuantile())
    });

    const shape = fittedDist.shape;
    const scale = fittedDist.scale;

    const minP = getProbabilityChartPMin({P});
    const maxP = getProbabilityChartPMax({P});

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
