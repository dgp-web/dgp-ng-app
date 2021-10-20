import { CardinalYAxis, Chart } from "../../shared/models";
import { ConnectedScatterGroup } from "./connected-scatter-group.model";
import { ConnectedScatterPlotControlLine } from "./connected-scatter-plot-control-line.model";

export interface ConnectedScatterPlot extends Chart, CardinalYAxis {
    readonly model: ReadonlyArray<ConnectedScatterGroup>;
    readonly controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;

    readonly xAxisMin?: number;
    readonly xAxisMax?: number;
    readonly xAxisTicks?: number;
}
