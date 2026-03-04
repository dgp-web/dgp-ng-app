import { createAction, props } from "@ngrx/store";
import { ColumnConfiguration, RowConfiguration, StackConfiguration } from "../../types";

export interface AddChildToRowOrColPayload {
    readonly parentConfig: RowConfiguration | ColumnConfiguration;
    readonly contentItemConfig: RowConfiguration | ColumnConfiguration | StackConfiguration;
    readonly index: number;
    readonly _$suspendResize: boolean;
}

export const addChildToRowOrCol = createAction(
    "[GL] AddChildOfRowOrCol", props<AddChildToRowOrColPayload>()
);
