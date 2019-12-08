import {leaderActionTypePrefix, peonActionTypePrefix} from "../../actions";
import {trimIncomingBroadcastAction} from "../trim-incoming-broadcast-action.function";

describe("trimIncomingBroadcastAction", () => {

    it(`should trim [Peon] prefix from action type if existing.`, () => {

        const processedAction = trimIncomingBroadcastAction({
            type: peonActionTypePrefix
        });

        expect(processedAction.type).toBe("");

    });

    it(`should trim [Leader] prefix from action type if existing.`, () => {

        const processedAction = trimIncomingBroadcastAction({
            type: leaderActionTypePrefix
        });

        expect(processedAction.type).toBe("");

    });

    it(`should throw an error if other actions arrive.`, () => {

        expect(() => trimIncomingBroadcastAction({
            type: "Some other action"
        })).toThrowError();

    });

});
