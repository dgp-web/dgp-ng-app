import { createReducer, on } from "@ngrx/store";
import { ActionContextState } from "../models/action-context-state.model";
import { selectActionContext } from "../actions/select-action-context.action";
import { deselectActionContext } from "../actions/deselect-action-context.action";
import { isNullOrUndefined } from "../../utils/null-checking.functions";
import { emptyActionContextState } from "../constants/empty-action-context-state.constant";

export const actionContextReducer = createReducer<ActionContextState>(
    emptyActionContextState,
    on(selectActionContext, (state, action) => {
        return {
            selectedActionContext: action.actionContext,
        };
    }),
    on(deselectActionContext, (state, action) => {

        if (isNullOrUndefined(action.selectedActionContextKey)) {
            return emptyActionContextState;
        } else {

            if (action.selectedActionContextKey === state.selectedActionContext.key) {
                return emptyActionContextState;
            } else {
                return state;
            }

        }

    })
);
