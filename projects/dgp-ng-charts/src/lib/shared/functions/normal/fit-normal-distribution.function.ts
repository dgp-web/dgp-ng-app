import { Many } from "data-modeling";
import * as d3 from "d3";

import { estimateVariance } from "./estimate-variance.function";

/**
 * Resources: https://www.npmjs.com/package/distfitjs
 */
export function fitNormalDistribution(data: Many<number>): { readonly mu: number; readonly variance: number; } {
    const mu = d3.median(data);
    const sigma2 = estimateVariance(data, mu);
    return {mu, variance: sigma2};
}
