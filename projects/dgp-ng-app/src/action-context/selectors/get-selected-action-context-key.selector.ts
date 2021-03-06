import { createSelector } from "@ngrx/store";
import { getSelectedActionContext } from "./get-selected-action-context.selector";

export const getSelectedActionContextKey = createSelector(
    getSelectedActionContext, x => x?.key
);
