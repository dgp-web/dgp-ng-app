import {BroadcastFunctionsTestData} from "./broadcast-functions.test-data.spec";
import {BroadcastHeartbeat, MessageEventLike} from "../../models";
import {getBroadcastHeartbeatFromMessageEvent} from "../get-broadcast-heartbeat-from-message-event.function";

describe("getBroadcastHeartbeatFromMessageEvent", () => {

    it(`should produce the same heartbeat whether it is parsed from a local-storage event
    (with stringified date) or from a broadcast-channel event`, () => {

        const heartbeatFromLocalStorage: BroadcastHeartbeat = {
            participantId: BroadcastFunctionsTestData.participant01.participantId,
            participantCreationDate: BroadcastFunctionsTestData.participant01.participantCreationDate.toString() as any,
            dataId: BroadcastFunctionsTestData.dataId01
        };

        const heartbeatFroBroadcastChannel: BroadcastHeartbeat = {
            participantId: BroadcastFunctionsTestData.participant01.participantId,
            participantCreationDate: BroadcastFunctionsTestData.participant01.participantCreationDate,
            dataId: BroadcastFunctionsTestData.dataId01
        };

        const messageEventFromLocalStorage: MessageEventLike = {
            data: heartbeatFromLocalStorage
        };

        const messageEventFromBroadcastChannel: MessageEventLike = {
            data: heartbeatFroBroadcastChannel
        };

        const parsedHeartbeat01 = getBroadcastHeartbeatFromMessageEvent(messageEventFromLocalStorage);
        const parsedHeartbeat02 = getBroadcastHeartbeatFromMessageEvent(messageEventFromBroadcastChannel);

        expect(parsedHeartbeat01.participantCreationDate.toString())
            .toEqual(parsedHeartbeat02.participantCreationDate.toString());

    });


});
