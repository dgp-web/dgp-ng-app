import { ConnectedScatterPlot, ConnectedScatterPlotConfig } from "../../../connected-scatter-plot/models";
import { mutatify } from "data-modeling";

/**
 * Ensure no model is passed as config which can lead to unwanted merge behavior.
 *
 * We first cast the config as model, then create a shallow copy from which the "model"
 * attribute can be deleted in a safe manner.
 */
export function resolveConnectedScatterPlotConfig(config: ConnectedScatterPlotConfig = {}): ConnectedScatterPlotConfig {
    let configWithModel = (config as ConnectedScatterPlot);
    if (configWithModel.model) {
        configWithModel = {...config, model: undefined};
        delete mutatify(configWithModel).model;
        config = {...configWithModel};
    }
    return config;
}
