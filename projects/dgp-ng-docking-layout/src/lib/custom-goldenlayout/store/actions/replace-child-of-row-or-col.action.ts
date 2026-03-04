// TODO Add this
import { createAction, props } from "@ngrx/store";
import { ColumnConfiguration, RowConfiguration, StackConfiguration } from "../../types";

export interface ReplaceChildOfRowOrColPayload {
    readonly parentConfig: RowConfiguration | ColumnConfiguration;
    readonly oldChildConfig: RowConfiguration | ColumnConfiguration | StackConfiguration;
    readonly newChildConfig: RowConfiguration | ColumnConfiguration | StackConfiguration;
    readonly destroyOldChild?: boolean;
}

export const replaceChildOfRowOrCol = createAction(
    "[GL] ReplaceChildOfRowOrCol", props<ReplaceChildOfRowOrColPayload>()
);
