import { createAction, props } from "@ngrx/store";

export const hotReload = createAction( "[HMR] Reload", props<{ readonly payload: any }>());
