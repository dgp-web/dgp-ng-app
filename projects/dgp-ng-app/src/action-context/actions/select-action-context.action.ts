import { createAction, props } from "@ngrx/store";

export const selectActionContext = createAction("[DgpActionContext] Select", props<{
    readonly selectedActionContextKey: string;
}>());
