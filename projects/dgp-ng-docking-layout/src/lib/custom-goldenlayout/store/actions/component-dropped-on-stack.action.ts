import { createAction, props } from "@ngrx/store";
import { AddTabToDockingLayoutEvent } from "../../models/stack/move-tab-in-docking-layout-event.model";

export const componentDroppedOnStack = createAction(
    "[GL] ComponentDroppedOnStack",
    props<{
        readonly payload: AddTabToDockingLayoutEvent;
    }>()
);
