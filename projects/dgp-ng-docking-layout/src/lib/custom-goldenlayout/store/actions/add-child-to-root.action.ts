import { createAction, props } from "@ngrx/store";
import type { RowOrColumnComponent } from "../../components/grid/_row-or-column.component";

export const addChildToRoot = createAction(
    "[GL] AddChildToRoot", props<{
        readonly oldChild: RowOrColumnComponent;
        readonly newChild: RowOrColumnComponent;
    }>()
);
