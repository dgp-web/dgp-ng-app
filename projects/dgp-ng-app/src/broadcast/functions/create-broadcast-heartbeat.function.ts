import { BroadcastHeartbeat, BroadcastParticipant } from "../models";

export interface CreateBroadcastHeartbeatPayload {
    readonly participant: Readonly<BroadcastParticipant>;
    readonly dataId?: any;
}

export function createBroadcastHeartbeat(
    payload: CreateBroadcastHeartbeatPayload
): BroadcastHeartbeat {
    return {
        participantId: payload.participant.participantId,
        participantCreationDate: payload.participant.participantCreationDate,
        dataId: payload.dataId,
        canBeLeader: payload.participant.canBeLeader
    };
}
