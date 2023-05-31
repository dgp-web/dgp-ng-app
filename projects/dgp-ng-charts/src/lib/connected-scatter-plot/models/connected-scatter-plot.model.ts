import { ConnectedScatterGroup } from "./connected-scatter-group.model";
import { ConnectedScatterPlotConfig } from "./connected-scatter-plot-config.model";

export interface ConnectedScatterPlot extends ConnectedScatterPlotConfig {
    readonly model: ReadonlyArray<ConnectedScatterGroup>;
}
