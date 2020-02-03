import {ActionReducer} from "@ngrx/store";
import { hotReload } from "./hmr.actions";

/**
 * Generate a reducer to set the root state in dev mode for HMR
 */
export function hmrReducer(x: ActionReducer<any>): ActionReducer<any> {

  return (state: any, action: typeof hotReload) => {
    if (action.type === "[HMR] Reload") {
      return (action as any).payload;
    }
    return x(state, action);
  };

}
