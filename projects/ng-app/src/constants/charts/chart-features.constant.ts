import {Many} from "data-modeling";
import {AppFeature} from "../../models/app-feature.model";
import {barChartFeature} from "./bar-chart-feature.constant";
import {connectedScatterPlotFeature} from "./connected-scatter-plot-feature.constant";

export const chartFeatures: Many<AppFeature> = [
    barChartFeature,
    connectedScatterPlotFeature
];
