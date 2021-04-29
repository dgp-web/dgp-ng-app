import { createSelector } from "@ngrx/store";
import { getSelectedActionContext } from "./get-selected-action-context.selector";

export const getSelectedActionContextLabel = createSelector(
    getSelectedActionContext, x => x?.label
);
