import { Many } from "data-modeling";
import { AppFeature } from "../../models/app-feature.model";
import { barChartFeature } from "./bar-chart-feature.constant";
import { connectedScatterPlotFeature } from "./connected-scatter-plot-feature.constant";
import { boxPlotFeature } from "./box-plot-feature.constant";
import { heatmapFeature } from "./heatmap-feature.constant";
import { shapesFeature } from "./shapes-feature.constant";

export const chartFeatures: Many<AppFeature> = [
    barChartFeature,
    boxPlotFeature,
    connectedScatterPlotFeature,
    heatmapFeature,
    shapesFeature
];
