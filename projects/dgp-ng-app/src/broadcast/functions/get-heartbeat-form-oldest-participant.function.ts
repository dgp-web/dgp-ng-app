import * as _ from "lodash";
import { BroadcastHeartbeat } from "../models";

export function getHeartbeatFromOldestParticipant(
    payload: ReadonlyArray<BroadcastHeartbeat>
): BroadcastHeartbeat {
    return _.minBy(
        payload, (x: BroadcastHeartbeat) => x.participantCreationDate
    );
}
