import { createSelector } from "@ngrx/store";
import { actionContextFeatureSelector } from "./action-context-feature.selector";

export const getSelectedActionContextKey = createSelector(
    actionContextFeatureSelector, x => x.selectedActionContextKey
);
