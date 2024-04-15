import { createFeatureSelector } from "@ngrx/store";
import { NormalPlotOptimizationState } from "../models";
import { normalPlotOptimizationStoreFeature } from "../constants";

export const getNormalPlotOptimizationStateSelector = createFeatureSelector<NormalPlotOptimizationState>(
    normalPlotOptimizationStoreFeature
);
