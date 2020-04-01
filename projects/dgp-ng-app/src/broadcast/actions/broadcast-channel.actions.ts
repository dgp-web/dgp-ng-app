import { Action, createAction, props } from "@ngrx/store";
import { BroadcastRole } from "../models/broadcast-role.model";

export const setOwnBroadcastRoleActionType = "[BroadcastChannel] SetOwnRole";

export class SetOwnBroadcastRoleAction implements Action {
    readonly type = setOwnBroadcastRoleActionType;

    constructor(
        public readonly payload: BroadcastRole
    ) {
    }
}

export const setOwnBroadcastRole = createAction(setOwnBroadcastRoleActionType, props<{ broadcastRole: BroadcastRole }>());

export const setBroadcastChannelDataIdActionType = "[BroadcastChannel] SetSelectedDataId";

export class SetBroadcastChannelDataIdAction implements Action {
    readonly type = setBroadcastChannelDataIdActionType;

    constructor(
        public readonly payload: any
    ) {
    }
}

export const setBroadcastChannelDataId = createAction(setBroadcastChannelDataIdActionType, props<{ readonly payload: any; }>());

export const requestInitialData = createAction("[BroadcastChannel] RequestInitialData");

export const leaderActionTypePrefix = "[Leader] ";
export const peonActionTypePrefix = "[Peon] ";
export const compositeActionTypePrefix = "[Composite] ";
export const trackRequestActionTypePrefix = "[Request] ";
