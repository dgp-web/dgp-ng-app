import { createAction, props } from "@ngrx/store";
import type { RowOrColumnComponent } from "../../components/grid/_row-or-column.component";

export const replaceChildOfRoot = createAction(
    "[GL] ReplaceChildOfRoot", props<{
        readonly oldChild: RowOrColumnComponent;
        readonly newChild: RowOrColumnComponent;
    }>()
);
