import { BroadcastParticipant } from "./broadcast-participant.model";

export interface DataBroadcastChannel extends BroadcastParticipant {
    readonly dataId?: any;
}

export const heartbeatBroadcastChannelId = "HeartbeatBroadcastChannel";
export const actionBroadcastChannelId = "ActionBroadcastChannel";
