import { ConnectedScatterPlotConfig } from "./connected-scatter-plot-config.model";
import { ConnectedScatterPlotModel } from "./connected-scatter-plot-model.model";

export interface ConnectedScatterPlot extends ConnectedScatterPlotConfig {
    readonly model: ConnectedScatterPlotModel;
}
