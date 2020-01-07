
import { BroadcastFunctionsTestData } from "./broadcast-functions.test-data.spec";
import {getDistinctHeartbeatsForChannel} from "../get-distinct-heartbeats-for-channel.function";

describe("getDistinctHeartbeatsForChannel", () => {

    it(`should return an empty array if no channelDataId is passed.`, () => {
        const result = getDistinctHeartbeatsForChannel({
            heartbeats: BroadcastFunctionsTestData.heartbeats,
            channelDataId: null
        });

        expect(result).toBeDefined();
        expect(result.length).toBe(0);
    });

    it(`should return a heartbeat for each participant on the passed channelDataId.`, () => {

        const result = getDistinctHeartbeatsForChannel({
            heartbeats: BroadcastFunctionsTestData.heartbeats,
            channelDataId: BroadcastFunctionsTestData.dataId01
        });

        expect(result.length).toBe(2);
        expect(result).toContain(BroadcastFunctionsTestData.heartbeat01);
        expect(result).toContain(BroadcastFunctionsTestData.heartbeat02);

    });


});
