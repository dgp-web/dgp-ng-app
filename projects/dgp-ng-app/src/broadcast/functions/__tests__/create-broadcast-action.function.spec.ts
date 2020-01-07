
import { Action } from "@ngrx/store";
import {BroadcastFunctionsTestData, DataVersion} from "./broadcast-functions.test-data.spec";
import {createBroadcastAction} from "../create-broadcast-action.function";

describe("createBroadcastAction", () => {

    const participant = BroadcastFunctionsTestData.participant01;
    const dataId: DataVersion = BroadcastFunctionsTestData.dataId01;

    const action: Action = {
        type: "Example type"
    };

    const broadcastAction = createBroadcastAction({
        participant,
        action,
        dataId
    });

    it(`should create an action with the passed participant's id and creation date,
    the passed data id, and the passed action`, () => {

        expect(broadcastAction.participantId).toBe(participant.participantId);
        expect(broadcastAction.participantCreationDate).toBe(participant.participantCreationDate);
        expect(broadcastAction.dataId.dataId).toBe(dataId.dataId);
        expect(broadcastAction.dataId.dataVersionNo).toBe(dataId.dataVersionNo);
        expect(broadcastAction.type).toBe("Example type");

    });

});
