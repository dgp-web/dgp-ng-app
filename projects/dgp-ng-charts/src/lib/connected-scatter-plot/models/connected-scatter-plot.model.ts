import { CardinalXAxis, CardinalYAxis, Chart } from "../../shared/models";
import { ConnectedScatterGroup } from "./connected-scatter-group.model";
import { ConnectedScatterPlotControlLine } from "./connected-scatter-plot-control-line.model";
import { DotConfig } from "./dot-config.model";

export interface ConnectedScatterPlot extends Chart, CardinalXAxis, CardinalYAxis, DotConfig {
    readonly model: ReadonlyArray<ConnectedScatterGroup>;
    readonly controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
}
