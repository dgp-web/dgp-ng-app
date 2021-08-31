import { isDate } from "util";
import { BroadcastHeartbeat, MessageEventLike } from "../models";

/**
 * Parses heartbeats from message events
 *
 * This is needed to ensure that the objects resulting from broadcast channels
 * and local storage look the same
 */
export function getBroadcastHeartbeatFromMessageEvent(messageEvent: MessageEventLike, canBeLeader: boolean): BroadcastHeartbeat {
    return {
        dataId: messageEvent.data.dataId,
        participantId: messageEvent.data.participantId,
        canBeLeader,
        participantCreationDate: isDate(messageEvent.data.participantCreationDate)
            ? messageEvent.data.participantCreationDate
            : new Date(messageEvent.data.participantCreationDate as string)
    };
}
