import { createAction, props } from "@ngrx/store";
import { ItemId } from "../types";
import type { StackComponent } from "../components/tabs/stack.component";
import type { RowOrColumnComponent } from "../components/grid/row-or-column.component";

export const removeStackFromParent = createAction(
    "[CustomGoldenLayout] RemoveStackFromParent",
    props<ItemId>()
);

export const addStackToParentRowOrColumn = createAction(
    "[CustomGoldenLayout] AddStackToParentRowOrColumn",
    props<ItemId & {
        readonly dimension: "height" | "width";
        readonly insertBefore: boolean;
        readonly stack: StackComponent;
    }>()
);

export const addStackWithNewParentToParentRowOrColumn = createAction(
    "[CustomGoldenLayout] AddStackWithNewParentToParentRowOrColumn",
    props<ItemId & {
        readonly dimension: "height" | "width";
        readonly insertBefore: boolean;
        readonly stack: StackComponent;
        readonly isVertical: boolean;
    }>()
);

export const addChildToRowOrColumn = createAction(
    "[CustomGoldenLayout] AddChildToRowOrColumn",
    props<{
        readonly contentItem: RowOrColumnComponent | StackComponent;
        readonly rowOrColumn: RowOrColumnComponent;
        readonly index: number;
        readonly _$suspendResize: boolean;
    }>()
);
