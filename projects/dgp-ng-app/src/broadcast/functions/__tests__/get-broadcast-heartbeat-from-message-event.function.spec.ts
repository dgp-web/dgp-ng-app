import {BroadcastFunctionsTestData} from "./broadcast-functions.test-data.spec";
import {getBroadcastHeartbeatFromMessageEvent} from "../get-broadcast-heartbeat-from-message-event.function";
import { BroadcastHeartbeat, MessageEventLike } from "../../models";

describe("getBroadcastHeartbeatFromMessageEvent", () => {

    it(`should produce the same heartbeat whether it is parsed from a local-storage event
    (with stringified date) or from a broadcast-channel event`, () => {

        const heartbeatFromLocalStorage: BroadcastHeartbeat = {
            participantId: BroadcastFunctionsTestData.participant01.participantId,
            participantCreationDate: BroadcastFunctionsTestData.participant01.participantCreationDate.toString() as any,
            dataId: BroadcastFunctionsTestData.dataId01,
            canBeLeader: true
        };

        const heartbeatFroBroadcastChannel: BroadcastHeartbeat = {
            participantId: BroadcastFunctionsTestData.participant01.participantId,
            participantCreationDate: BroadcastFunctionsTestData.participant01.participantCreationDate,
            dataId: BroadcastFunctionsTestData.dataId01,
            canBeLeader: true
        };

        const messageEventFromLocalStorage: MessageEventLike = {
            data: heartbeatFromLocalStorage
        };

        const messageEventFromBroadcastChannel: MessageEventLike = {
            data: heartbeatFroBroadcastChannel
        };

        const parsedHeartbeat01 = getBroadcastHeartbeatFromMessageEvent(messageEventFromLocalStorage, true);
        const parsedHeartbeat02 = getBroadcastHeartbeatFromMessageEvent(messageEventFromBroadcastChannel, true);

        expect(parsedHeartbeat01.participantCreationDate.toString())
            .toEqual(parsedHeartbeat02.participantCreationDate.toString());

    });


});
