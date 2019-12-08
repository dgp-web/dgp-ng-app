import {BroadcastFunctionsTestData} from "./broadcast-functions.test-data.spec";
import {getHeartbeatFromOldestParticipant} from "../get-heartbeat-form-oldest-participant.function";

describe("getHeartbeatFromOldestParticipant", () => {

    const heartbeat01 = BroadcastFunctionsTestData.heartbeat01;
    const heartbeat02 = BroadcastFunctionsTestData.heartbeat02;

    const heartbeats = [heartbeat01, heartbeat02];

    it(`should return a heartbeat with a minimal participantCreationDate`, () => {
        const result = getHeartbeatFromOldestParticipant(heartbeats);
        expect(result).toBe(heartbeat01);
    });


});
