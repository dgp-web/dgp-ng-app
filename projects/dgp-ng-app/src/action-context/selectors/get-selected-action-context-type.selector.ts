import { createSelector } from "@ngrx/store";
import { getSelectedActionContext } from "./get-selected-action-context.selector";

export const getSelectedActionContextType = createSelector(
    getSelectedActionContext, x => x?.type
);
