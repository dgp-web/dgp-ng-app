import { Action } from "@ngrx/store";
import { compositeActionTypePrefix, trackRequestActionTypePrefix } from "../actions";

export function filterActionToPrefixWithLeaderPredicate(action: Action): boolean {
    return action.type.startsWith(compositeActionTypePrefix)
        || action.type.startsWith(trackRequestActionTypePrefix);
}
