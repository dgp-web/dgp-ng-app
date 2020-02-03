import { createAction, props } from "@ngrx/store";

export const showLoadingSpinner = createAction("[RoutingOverlay] ShowSpinner", props<{ readonly showSpinner: boolean }>());
