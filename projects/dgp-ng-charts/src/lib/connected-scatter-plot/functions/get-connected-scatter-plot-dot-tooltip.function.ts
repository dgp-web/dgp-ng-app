import { ConnectedScatterGroup, ConnectedScatterSeries, Dot, DotTooltipFormat } from "../models";
import { CardinalAxisTickFormat } from "../../shared/models/cardinal-axis-tick-format.model";
import { notNullOrUndefined } from "dgp-ng-app";
import { Many } from "data-modeling";
import { defaultDotTooltipFormat } from "../constants/default-dot-tooltip-format.constant";

export function getConnectedScatterPlotDotTooltip(payload: {
    readonly group: ConnectedScatterGroup;
    readonly series: ConnectedScatterSeries;
    readonly dot: Dot;
    readonly yAxisTickValues: Many<number>;
    readonly dotTooltipFormat?: DotTooltipFormat;
    readonly xAxisTickFormat?: CardinalAxisTickFormat;
    readonly yAxisTickFormat?: CardinalAxisTickFormat;
}): string {
    const dotTooltipFormat = payload.dotTooltipFormat;

    if (notNullOrUndefined(dotTooltipFormat)) {
        return dotTooltipFormat(payload);
    }

    return defaultDotTooltipFormat(payload);

}
