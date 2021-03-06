import { isDate } from "util";
import { BroadcastHeartbeat, MessageEventLike } from "../models";

/**
 * Parses heartbeats from message events
 *
 * This is needed to ensure that the objects resulting from broadcast channels
 * and local storage look the same
 *
 * @param messageEvent
 */
export function getBroadcastHeartbeatFromMessageEvent(messageEvent: MessageEventLike): BroadcastHeartbeat {
    return {
        dataId: messageEvent.data.dataId,
        participantId: messageEvent.data.participantId,
        participantCreationDate: isDate(messageEvent.data.participantCreationDate) ?
            messageEvent.data.participantCreationDate : new Date(messageEvent.data.participantCreationDate as string)
    };
}
