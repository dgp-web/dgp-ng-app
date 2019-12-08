import { Action } from "@ngrx/store";
import {leaderActionTypePrefix, peonActionTypePrefix} from "../actions";

export function trimIncomingBroadcastAction(action: Action) {

    if (action.type.startsWith(peonActionTypePrefix)) {
        return Object.assign({}, action, {
            type: action.type.replace(peonActionTypePrefix, "")
        } as Action) as Action;
    } else if (action.type.startsWith(leaderActionTypePrefix)) {
        return Object.assign({}, action, {
            type: action.type.replace(leaderActionTypePrefix, "")
        } as Action) as Action;
    } else {
        throw Error("Broadcasted actions must either be marked as Peon or Leader actions");
    }
}
