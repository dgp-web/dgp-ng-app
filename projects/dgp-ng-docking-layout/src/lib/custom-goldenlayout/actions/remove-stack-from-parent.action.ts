import { createAction, props } from "@ngrx/store";
import { ItemId } from "../types";

export const removeStackFromParent = createAction(
    "[CustomGoldenLayout] RemoveStackFromParent",
    props<ItemId>()
);
