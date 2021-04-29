import { createSelector } from "@ngrx/store";
import { getSelectedActionContext } from "./get-selected-action-context.selector";

export const getSelectedActionContextValue = createSelector(
    getSelectedActionContext, x => x?.value
);
