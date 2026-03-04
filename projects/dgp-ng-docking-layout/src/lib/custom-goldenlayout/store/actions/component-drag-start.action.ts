import { createAction, props } from "@ngrx/store";
import { ComponentDragStartPayload } from "../../models/stack/component-drag-start-payload.model";

export const componentDragStart = createAction(
    "[GL] ComponentDragStart",
    props<{
        readonly payload: ComponentDragStartPayload;
    }>()
);

