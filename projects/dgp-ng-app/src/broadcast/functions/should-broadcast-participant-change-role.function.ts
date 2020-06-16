import {isNullOrUndefined} from "util";
import {getDistinctHeartbeatsForChannel} from "./get-distinct-heartbeats-for-channel.function";
import {getHeartbeatFromOldestParticipant} from "./get-heartbeat-form-oldest-participant.function";
import { BroadcastHeartbeat, BroadcastParticipant, BroadcastRole } from "../models";

export interface ShouldBroadcastParticipantChangeRolePayload {
    readonly heartbeats: ReadonlyArray<BroadcastHeartbeat>;
    readonly participantId: string;
    readonly currentBroadcastRole: BroadcastRole;
}

export interface ShouldBroadcastParticipantChangeRoleResult {
    readonly shouldChangeRole: boolean;
    readonly newBroadcastRole?: BroadcastRole;
}

export function shouldBroadcastParticipantChangeRole(
    payload: ShouldBroadcastParticipantChangeRolePayload
): ShouldBroadcastParticipantChangeRoleResult {

    const result = {
        shouldChangeRole: false,
        newRole: null
    };

    const ownHeartbeat = payload.heartbeats.find(x => x.participantId === payload.participantId);

    if (isNullOrUndefined(ownHeartbeat.dataId)) {
        if (payload.currentBroadcastRole !== BroadcastRole.None) {
            return {
                newBroadcastRole: BroadcastRole.None,
                shouldChangeRole: true
            };
        } else {
            return result;
        }
    }

    const distinctHeartbeatsForOwnChannel = getDistinctHeartbeatsForChannel({
        heartbeats: payload.heartbeats,
        channelDataId: ownHeartbeat.dataId
    });

    if (distinctHeartbeatsForOwnChannel.length < 2) {
        if (payload.currentBroadcastRole !== BroadcastRole.None) {
            return {
                newBroadcastRole: BroadcastRole.None,
                shouldChangeRole: true
            };
        } else {
            return result;
        }
    }

    const elderSender: BroadcastParticipant = getHeartbeatFromOldestParticipant(distinctHeartbeatsForOwnChannel);

    if (elderSender.participantId === payload.participantId) {

        if (payload.currentBroadcastRole !== BroadcastRole.Leader) {
            return {
                newBroadcastRole: BroadcastRole.Leader,
                shouldChangeRole: true
            };
        } else {
            return result;
        }

    } else {

        if (payload.currentBroadcastRole !== BroadcastRole.Peon) {
            return {
                newBroadcastRole: BroadcastRole.Peon,
                shouldChangeRole: true
            };
        } else {
            return result;
        }

    }
}
