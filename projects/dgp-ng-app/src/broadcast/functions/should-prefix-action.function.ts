import { Action } from "@ngrx/store";
import { BroadcastRole } from "../models";

export interface ShouldPrefixActionPayload {
    readonly action: Readonly<Action>;
    readonly actualBroadcastRole: BroadcastRole;
    readonly triggeringBroadcastRole: BroadcastRole;
    readonly triggeringActionPrefixes: ReadonlyArray<string>;
}

export function shouldPrefixAction(payload: ShouldPrefixActionPayload): boolean {

    if (payload.actualBroadcastRole === payload.triggeringBroadcastRole) {

        if (payload.triggeringActionPrefixes.some(actionPrefix => {
            return payload.action.type.startsWith(actionPrefix);
        })) {
            return true;
        }
    }

    return false;

}
