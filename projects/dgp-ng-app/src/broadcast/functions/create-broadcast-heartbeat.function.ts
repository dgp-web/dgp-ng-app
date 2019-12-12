import { BroadcastParticipant } from "../models/broadcast-participant.model";
import { BroadcastHeartbeat } from "../models/broadcast-heartbeat.model";

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
    };
}
