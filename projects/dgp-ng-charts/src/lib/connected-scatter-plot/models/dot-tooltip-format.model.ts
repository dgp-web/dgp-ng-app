import { CardinalAxisTickFormat } from "../../shared/models/cardinal-axis-tick-format.model";
import { ConnectedScatterGroup } from "./connected-scatter-group.model";
import { ConnectedScatterSeries } from "./connected-scatter-series.model";
import { Dot } from "./dot.model";
import { Many } from "data-modeling";

export type DotTooltipFormat = (payload: {
    readonly group: ConnectedScatterGroup;
    readonly series: ConnectedScatterSeries;
    readonly dot: Dot;
    readonly yAxisTickValues: Many<number>;
    readonly xAxisTickFormat?: CardinalAxisTickFormat;
    readonly yAxisTickFormat?: CardinalAxisTickFormat;
}) => string;
