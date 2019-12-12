import {isNullOrUndefined} from "util";
import * as _ from "lodash";
import { BroadcastHeartbeat } from "../models/broadcast-heartbeat.model";

export interface GetDistinctHeartbeatsForChannelPayload {
    readonly channelDataId?: any;
    readonly heartbeats: ReadonlyArray<BroadcastHeartbeat>;
}

/**
 * Returns distinct heartbeats for a given data channel
 *
 * If no dataId is passed to identify the channel, an empty array is returned
 * Heartbeats are distinguished by participantId
 *
 * @param payload
 */
export function getDistinctHeartbeatsForChannel(
    payload: GetDistinctHeartbeatsForChannelPayload
): BroadcastHeartbeat[] {

    if (isNullOrUndefined(payload.channelDataId)) { return []; }

    const distinctHearbeats = _.uniqBy(payload.heartbeats, (x) => x.participantId);

    return distinctHearbeats.filter(x => {
        if (isNullOrUndefined(x.dataId)) { return false; }

        return _.isEqual(x.dataId, payload.channelDataId);
    });

}
