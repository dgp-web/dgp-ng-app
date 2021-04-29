import { createAction, props } from "@ngrx/store";
import { ActionContext } from "../models/action-context.model";

export const selectActionContext = createAction("[DgpActionContext] Select", props<{
    readonly actionContext: ActionContext;
}>());
