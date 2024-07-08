import { createAction, props } from "@ngrx/store";
import { ItemId } from "../types";
import type { StackComponent } from "../components/tabs/stack.component";

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
    "[CustomGoldenLayout] AddStackToParentRowOrColumn",
    props<ItemId & {
        readonly dimension: "height" | "width";
        readonly insertBefore: boolean;
        readonly stack: StackComponent;
        readonly isVertical: boolean;
    }>()
);
