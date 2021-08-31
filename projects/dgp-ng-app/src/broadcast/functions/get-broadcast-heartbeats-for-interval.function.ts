import { BroadcastHeartbeat, BroadcastParticipant } from "../models";
import { createBroadcastHeartbeat } from "./create-broadcast-heartbeat.function";

export function getBroadcastHeartbeatsForInterval<TDataId = any>(payload: {
    heartbeatsFromOtherParticipants: ReadonlyArray<BroadcastHeartbeat>;
    participant: BroadcastParticipant;
    dataId: TDataId;
}): BroadcastHeartbeat[] {

    const ownHeartbeat = createBroadcastHeartbeat({
        participant: payload.participant,
        dataId: payload.dataId
    });

    return payload.heartbeatsFromOtherParticipants
        .concat([ownHeartbeat]);
}
