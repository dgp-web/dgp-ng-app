import { CardinalXAxis, CardinalYAxis, Chart } from "../../shared/models";
import { DotConfig } from "./dot-config.model";
import { LineConfig } from "./line-config.model";
import { ConnectedScatterPlotControlLine } from "./connected-scatter-plot-control-line.model";

export interface ConnectedScatterPlotConfig extends Chart, CardinalXAxis, CardinalYAxis, DotConfig, LineConfig {
    readonly controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
}
