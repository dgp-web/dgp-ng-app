import { ScaleType } from "../models";
import * as d3 from "d3";
import { ScaleLinear, ScaleLogarithmic } from "d3";
import { notNullOrUndefined } from "dgp-ng-app";

export function createCardinalAxisScale(payload: {
    readonly dataAreaSize: number;
    readonly min: number;
    readonly max: number;
    readonly step?: number;
    readonly scaleType: ScaleType;
    readonly interpolator?: d3.InterpolatorFactory<number, number>;
}) {

    const dataAreaSize = payload.dataAreaSize;
    const min = payload.min;
    const max = payload.max;
    const step = payload.step;
    const interpolator = payload.interpolator;

    let scale: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;

    switch (payload.scaleType) {
        default:
        case ScaleType.Linear:
            scale = d3.scaleLinear()
                .domain([min, max])
                .range([0, dataAreaSize]);

            if (interpolator) {
                scale = scale.interpolate(interpolator);
            }

            break;
        case ScaleType.Logarithmic:
            scale = d3.scaleLog();

            if (notNullOrUndefined(step) && step > 0) {
                scale = (scale as ScaleLogarithmic<number, number>).base(step);
            }

            scale = (scale as ScaleLogarithmic<number, number>)
                .domain([(min >= 0 ? min : 0.001), (max >= 0 ? max : 0.001)])
                .range([0, dataAreaSize]);
            break;
    }

    return scale;

}
