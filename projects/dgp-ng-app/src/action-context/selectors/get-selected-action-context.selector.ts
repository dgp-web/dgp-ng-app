import { createSelector } from "@ngrx/store";
import { actionContextFeatureSelector } from "./action-context-feature.selector";

export const getSelectedActionContext = createSelector(
    actionContextFeatureSelector, x => x.selectedActionContext
);
