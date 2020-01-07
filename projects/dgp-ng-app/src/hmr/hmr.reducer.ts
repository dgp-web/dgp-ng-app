import {ActionReducer} from "@ngrx/store";
import {HmrReloadAction, hmrReloadActionType} from "./hmr.actions";

/**
 * Generate a reducer to set the root state in dev mode for HMR
 */
export function hmrReducer(x: ActionReducer<any>): ActionReducer<any> {

  return (state: any, action: HmrReloadAction) => {
    if (action.type === hmrReloadActionType) {
      return action.payload;
    }
    return x(state, action);
  };

}
