import { Action } from "@ngrx/store";
import {BroadcastRole} from "../models";

export const setOwnBroadcastRoleActionType = "[BroadcastChannel] SetOwnRole";

export class SetOwnBroadcastRoleAction implements Action {
    readonly type = setOwnBroadcastRoleActionType;

    constructor(
        public readonly payload: BroadcastRole
    ) {}
}

export const setBroadcastChannelDataIdActionType = "[BroadcastChannel] SetSelectedDataId";

export class SetBroadcastChannelDataIdAction implements Action {
    readonly type = setBroadcastChannelDataIdActionType;

    constructor(
        public readonly payload: any
    ) {}
}

export const leaderActionTypePrefix = "[Leader] ";
export const peonActionTypePrefix = "[Peon] ";
export const compositeActionTypePrefix = "[Composite] ";
export const trackRequestActionTypePrefix = "[Request] ";
