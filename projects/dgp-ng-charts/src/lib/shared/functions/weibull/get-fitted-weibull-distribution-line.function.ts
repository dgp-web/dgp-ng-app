import { Many } from "data-modeling";
import { fitWeibullDistribution } from "./fit-weibull-distribution.function";
import * as d3 from "d3";
import { getWeibullQuantile } from "./get-weibull-quantile.function";
import { Dot } from "../../../connected-scatter-plot/models";
import { toPercent } from "../to-percent.function";
import { toWeibullQuantile } from "./to-weibull-quantile.function";
import { defaultProbabilityChartPMax, defaultProbabilityChartPMin } from "../../constants";

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

    const minP = Math.min(d3.min(P), defaultProbabilityChartPMin);
    const maxP = Math.max(d3.max(P), defaultProbabilityChartPMax);

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
