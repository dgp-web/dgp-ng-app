import { createReducer, on } from "@ngrx/store";
import { ActionContextState } from "../models/action-context-state.model";
import { selectActionContext } from "../actions/select-action-context.action";
import { deselectActionContext } from "../actions/deselect-action-context.action";
import { isNullOrUndefined } from "../../utils/null-checking.functions";

export const actionContextReducer = createReducer<ActionContextState>(
    {selectedActionContextKey: null},
    on(selectActionContext, (state, action) => {
        return {
            selectedActionContextKey: action.selectedActionContextKey
        };
    }),
    on(deselectActionContext, (state, action) => {

        if (isNullOrUndefined(action.selectedActionContextKey)) {
            return {
                selectedActionContextKey: null
            };
        } else {

            if (action.selectedActionContextKey === state.selectedActionContextKey) {
                return {
                    selectedActionContextKey: null
                };
            } else {
                return state;
            }

        }

    })
);
