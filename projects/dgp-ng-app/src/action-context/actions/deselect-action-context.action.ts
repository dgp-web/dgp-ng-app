import { createAction, props } from "@ngrx/store";

export const deselectActionContext = createAction("[DgpActionContext] Deselect", props<{
    readonly selectedActionContextKey?: string;
}>());
