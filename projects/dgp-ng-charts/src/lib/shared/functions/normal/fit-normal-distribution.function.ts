import { Many } from "data-modeling";
import * as d3 from "d3";
import { estimateVariance } from "../../../../../../dgp-labs/src/app/features/charts/containers/connected-scatter-plot-labs.component";

/**
 * Resources: https://www.npmjs.com/package/distfitjs
 */
export function fitNormalDistribution(data: Many<number>): { readonly mu: number; readonly variance: number; } {
    const mu = d3.median(data);
    const sigma2 = estimateVariance(data, mu);
    return {mu, variance: sigma2};
}
