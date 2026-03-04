import { createAction, props } from "@ngrx/store";
import { RemoveStackEmptyDueToDraggingPayload } from "../../models/stack/remove-stack-empty-due-to-dragging-payload.model";

export const removeStackEmptyDueToDragging = createAction(
    "[GL] RemoveStackEmptyDueToDragging",
    props<{
        readonly payload: RemoveStackEmptyDueToDraggingPayload;
    }>()
);
