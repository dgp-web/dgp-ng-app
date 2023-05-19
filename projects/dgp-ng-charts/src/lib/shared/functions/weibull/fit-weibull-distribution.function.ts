import { Many } from "data-modeling";
import * as regression from "regression";

/*
To fit a Weibull distribution to these data, notice that the CDF for the
Weibull is p = Pr{X <= x} = 1 - exp(-(x/a)^b).
Transforming that to log(a) + log(-log(1-p))*(1/b) = log(x) again gives a
linear relationship, this time between log(-log(1-p)) and log(x).
We can use least squares to fit a straight line on the transformed scale
using p and x from the ECDF, and the slope and intercept of that line lead
to estimates of a and b.

logx = log(x);
logy = log(-log(1 - p));
poly = polyfit(logy,logx,1);
paramHat = [exp(poly(2)) 1/poly(1)]

 * Resources: https://www.npmjs.com/package/distfitjs
 * https://www.mbfys.ru.nl/~robvdw/CNP04/LAB_ASSIGMENTS/LAB05_CN05/MATLAB2007b/stats/html/cdffitdemo.html#9
 */


/**
 * https://www.mbfys.ru.nl/~robvdw/CNP04/LAB_ASSIGMENTS/LAB05_CN05/MATLAB2007b/stats/html/cdffitdemo.html#9
 */

export function fitWeibullDistribution(payload: {
    readonly x: Many<number>;
    readonly y: Many<number>;
}) {
    const x = payload.x;
    const y = payload.y;

    const tuples = y.map((yv, index) => [yv, x[index]]);

    const engine = regression.polynomial(tuples, {order: 1});

    const slope = engine.equation[0];
    const intercept = engine.equation[1];

    const scale = Math.exp(intercept);
    const shape = 1 / slope;

    return {scale, shape};

}
