import { createFeatureSelector } from "@ngrx/store";
import { ActionContextState } from "../models/action-context-state.model";
import { actionContextStoreFeature } from "../constants/action-context-store-feature.constant";

export const actionContextFeatureSelector = createFeatureSelector<ActionContextState>(actionContextStoreFeature);
