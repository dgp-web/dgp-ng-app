import {Action} from "@ngrx/store";

export const hmrReloadActionType = "[HMR] Reload";

export class HmrReloadAction implements Action {
  readonly type = hmrReloadActionType;

  constructor(public payload: any) {
  }

}
