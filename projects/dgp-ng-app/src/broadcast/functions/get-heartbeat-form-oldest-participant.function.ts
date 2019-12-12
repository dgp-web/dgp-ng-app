import * as _ from "lodash";
import { BroadcastHeartbeat } from "../models/broadcast-heartbeat.model";

export function getHeartbeatFromOldestParticipant(
    payload: ReadonlyArray<BroadcastHeartbeat>
): BroadcastHeartbeat {
    return _.minBy(
        payload, (x: BroadcastHeartbeat) => x.participantCreationDate
    );
}
