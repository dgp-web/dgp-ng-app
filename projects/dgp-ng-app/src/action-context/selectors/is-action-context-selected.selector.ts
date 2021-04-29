import { createSelector } from "@ngrx/store";
import { getSelectedActionContextKey } from "./get-selected-action-context-key.selector";
import { isNullOrUndefined } from "../../utils/null-checking.functions";

export function isActionContextSelected(actionContextKey: string) {
    return createSelector(
        getSelectedActionContextKey,
        selectedActionContextKey => {

            if (isNullOrUndefined(actionContextKey)) return false;

            return selectedActionContextKey === actionContextKey;
        }
    );
}
