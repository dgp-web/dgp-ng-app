import {Many} from "data-modeling";
import {AppFeature} from "../../models/app-feature.model";
import {barChartFeature} from "./bar-chart-feature.constant";

export const chartFeatures: Many<AppFeature> = [
    barChartFeature
];
