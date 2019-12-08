import { Action } from "@ngrx/store";

export const showLoadingSpinnerActionType = "[RoutingOverlay] ShowSpinner";

export class ShowLoadingSpinnerAction implements Action {
    readonly type = showLoadingSpinnerActionType;

    constructor(public readonly showSpinner: boolean) {
    }

}
