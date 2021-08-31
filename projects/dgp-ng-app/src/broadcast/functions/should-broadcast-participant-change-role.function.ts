import { getDistinctHeartbeatsForChannel } from "./get-distinct-heartbeats-for-channel.function";
import { getHeartbeatFromOldestParticipant } from "./get-heartbeat-form-oldest-participant.function";
import { BroadcastRole } from "../models/core/broadcast-role.model";
import { BroadcastHeartbeat } from "../models/core/broadcast-heartbeat.model";
import { isNullOrUndefined } from "../../utils/null-checking.functions";

export interface ShouldBroadcastParticipantChangeRolePayload {
    readonly heartbeats: ReadonlyArray<BroadcastHeartbeat>;
    readonly participantId: string;
    readonly currentBroadcastRole: BroadcastRole;
}

export interface ShouldBroadcastParticipantChangeRoleResult {
    readonly shouldChangeRole: boolean;
    readonly newBroadcastRole?: BroadcastRole;
}

export const shouldDoNothing: ShouldBroadcastParticipantChangeRoleResult = {
    shouldChangeRole: false
};

export const shouldSwitchToNone: ShouldBroadcastParticipantChangeRoleResult = {
    newBroadcastRole: BroadcastRole.None,
    shouldChangeRole: true
};

export const shouldSwitchToLeader: ShouldBroadcastParticipantChangeRoleResult = {
    newBroadcastRole: BroadcastRole.Leader,
    shouldChangeRole: true
};

export const shouldSwitchToPeon: ShouldBroadcastParticipantChangeRoleResult = {
    newBroadcastRole: BroadcastRole.Peon,
    shouldChangeRole: true
};

export function shouldBroadcastParticipantChangeRole(
    payload: ShouldBroadcastParticipantChangeRolePayload
): ShouldBroadcastParticipantChangeRoleResult {

    const ownHeartbeat = payload.heartbeats.find(x => x.participantId === payload.participantId);

    if (isNullOrUndefined(ownHeartbeat.dataId)) {
        if (payload.currentBroadcastRole !== BroadcastRole.None) return shouldSwitchToNone;
        else return shouldDoNothing;
    }

    const distinctHeartbeatsForOwnChannel = getDistinctHeartbeatsForChannel({
        heartbeats: payload.heartbeats,
        channelDataId: ownHeartbeat.dataId
    });

    if (distinctHeartbeatsForOwnChannel.length < 2) {
        if (payload.currentBroadcastRole !== BroadcastRole.None) return shouldSwitchToNone;
        else return shouldDoNothing;
    }

    const elderSender = getHeartbeatFromOldestParticipant(distinctHeartbeatsForOwnChannel.filter(x => x.canBeLeader));

    if (!elderSender) {
        if (payload.currentBroadcastRole !== BroadcastRole.None) return shouldSwitchToNone;
        else return shouldDoNothing;
    }

    if (elderSender.participantId === payload.participantId) {
        if (payload.currentBroadcastRole !== BroadcastRole.Leader) return shouldSwitchToLeader;
        else return shouldDoNothing;
    } else {
        if (payload.currentBroadcastRole !== BroadcastRole.Peon) return shouldSwitchToPeon;
        else return shouldDoNothing;
    }

}
