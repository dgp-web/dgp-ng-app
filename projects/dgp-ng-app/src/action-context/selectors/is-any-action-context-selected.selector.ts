import { createSelector } from "@ngrx/store";
import { actionContextFeatureSelector } from "./action-context-feature.selector";
import { notNullOrUndefined } from "../../utils/null-checking.functions";

export const isActionContextSelected = createSelector(
    actionContextFeatureSelector, x => notNullOrUndefined(x.selectedActionContextKey)
);
