import { BroadcastFunctionsTestData } from "./broadcast-functions.test-data.spec";
import {createBroadcastHeartbeat, CreateBroadcastHeartbeatPayload} from "../create-broadcast-heartbeat.function";

describe("createBroadcastHeartbeat", () => {

    it(`should create a heartbeat with the passed participant's id and creation date,
    and the passed data id`, () => {

        const participant = BroadcastFunctionsTestData.participant01;

        const payload: CreateBroadcastHeartbeatPayload = {
            participant
        };

        const heartbeat = createBroadcastHeartbeat(payload);

        expect(heartbeat.participantId).toBe(payload.participant.participantId);
        expect(heartbeat.participantCreationDate).toBe(payload.participant.participantCreationDate);
        expect(heartbeat.dataId).toBe(payload.dataId);

    });


});
