import { Many } from "data-modeling";
import * as d3 from "d3";

import { estimateVariance } from "./estimate-variance.function";
import { NormalParameters } from "../../models";

/**
 * Resources: https://www.npmjs.com/package/distfitjs
 */
export function fitNormalDistribution(X: Many<number>): NormalParameters {
    const median = d3.median(X);
    const variance = estimateVariance(X, median);
    return {median, variance};
}
