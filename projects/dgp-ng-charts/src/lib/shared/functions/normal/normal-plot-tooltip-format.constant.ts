import { DotTooltipFormat } from "../../../connected-scatter-plot/models";
import { formatNormalPlotYValue } from "./format-normal-plot-y-value.function";
import { notNullOrUndefined } from "dgp-ng-app";

export const normalPlotTooltipFormat: DotTooltipFormat = payload => {
    const group = payload.group;
    const series = payload.series;
    const dot = payload.dot;
    const yAxisTickValues = payload.yAxisTickValues;
    const xAxisTickFormat = payload.xAxisTickFormat;
    const yAxisTickFormat = payload.yAxisTickFormat;
    const yValueFormat = formatNormalPlotYValue({yAxisTickValues});

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

    result += yValueFormat(dot.y);

    result += ")";

    return result;
};
