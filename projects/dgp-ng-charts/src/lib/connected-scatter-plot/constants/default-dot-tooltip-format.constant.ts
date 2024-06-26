import { DotTooltipFormat } from "../models";
import { notNullOrUndefined } from "dgp-ng-app";

export const defaultDotTooltipFormat: DotTooltipFormat = payload => {
    const group = payload.group;
    const series = payload.series;
    const dot = payload.dot;
    const xAxisTickFormat = payload.xAxisTickFormat;
    const yAxisTickFormat = payload.yAxisTickFormat;

    let result = "";
    if (notNullOrUndefined(series.label)) result += series.label + ": ";
    if (notNullOrUndefined(dot.label)) {
        if (result) result += "; ";
        result += dot.label + ": ";
    }

    result += "(";
    if (notNullOrUndefined(xAxisTickFormat)) {
        result += xAxisTickFormat(dot.x);
    } else {
        result += dot.x.toPrecision(3);
    }

    result += ", ";

    if (notNullOrUndefined(yAxisTickFormat)) {
        result += yAxisTickFormat(dot.y);
    } else {
        result += dot.y.toPrecision(3);
    }
    result += ")";

    return result;
};
