// TODO Add this
import { createAction, props } from "@ngrx/store";
import { ColumnConfiguration, RowConfiguration, StackConfiguration } from "../../types";

export interface RemoveChildOfRowOrColPayload {
    readonly parentConfig: RowConfiguration | ColumnConfiguration;
    readonly contentItemConfig: RowConfiguration | ColumnConfiguration | StackConfiguration;
    readonly keepChild: boolean;
}

export const removeChildOfRowOrCol = createAction(
    "[GL] RemoveChildOfRowOrCol", props<RemoveChildOfRowOrColPayload>()
);
