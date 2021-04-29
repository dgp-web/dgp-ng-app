import { createSelector } from "@ngrx/store";
import { notNullOrUndefined } from "../../utils/null-checking.functions";
import { getSelectedActionContextKey } from "./get-selected-action-context-key.selector";

export const isAnyActionContextSelected = createSelector(
    getSelectedActionContextKey, x => notNullOrUndefined(x)
);
