import { Many } from "data-modeling";
import * as regression from "regression";
import { WeibullParameters } from "../../models";

/**
 * Performs a least squares estimate to determine parameters for fitted Weibull distribution
 *
 * Resources:
 * https://www.mbfys.ru.nl/~robvdw/CNP04/LAB_ASSIGMENTS/LAB05_CN05/MATLAB2007b/stats/html/cdffitdemo.html#9
 */
export function fitWeibullDistribution(payload: {
    readonly X: Many<number>;
    readonly quantiles: Many<number>;
}): WeibullParameters {
    const X = payload.X;
    const quantiles = payload.quantiles;

    const tuples = quantiles.map((yv, index) => [yv, X[index]]);

    const engine = regression.polynomial(tuples, {order: 1});

    const slope = engine.equation[0];
    const intercept = engine.equation[1];

    const scale = Math.exp(intercept);
    const shape = 1 / slope;

    return {scale, shape};

}
