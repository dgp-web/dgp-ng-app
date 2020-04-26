import { BroadcastFunctionsTestData } from "./broadcast-functions.test-data.spec";
import {filterIncomingBroadcastAction} from "../filter-incoming-broadcast-action.function";
import { leaderActionTypePrefix, peonActionTypePrefix } from "../../actions";
import { BroadcastAction, BroadcastRole } from "../../models";

describe("filterIncomingBroadcastAction", () => {

    it(`should return false if data of action or of the passed participant are not set.`, () => {

        let result = filterIncomingBroadcastAction({
            action: {
                dataId: null
            } as BroadcastAction,
            dataId: BroadcastFunctionsTestData.dataId01,
            ownBroadcastRole: BroadcastRole.Leader
        });

        expect(result).toBeFalsy();

        result = filterIncomingBroadcastAction({
            action: {
                dataId: BroadcastFunctionsTestData.dataId01
            } as BroadcastAction,
            dataId: null,
            ownBroadcastRole: BroadcastRole.Leader
        });

        expect(result).toBeFalsy(
            "Actions whose data id is not set should not pass the filter."
        );

    });

    it(`should return false if data of action or of the passed participant don't match.`, () => {

        const result = filterIncomingBroadcastAction({
            action: {
                dataId: BroadcastFunctionsTestData.dataId02
            } as BroadcastAction,
            dataId: BroadcastFunctionsTestData.dataId01,
            ownBroadcastRole: BroadcastRole.Leader
        });

        expect(result).toBeFalsy(
            "Actions whose data id doesn't match dataId should not pass the filter."
        );

    });

    it(`should return false if a peon action arrives at another peon.`, () => {

        const result = filterIncomingBroadcastAction({
            action: {
                dataId: BroadcastFunctionsTestData.dataId01,
                type: peonActionTypePrefix
            } as BroadcastAction,
            dataId: BroadcastFunctionsTestData.dataId01,
            ownBroadcastRole: BroadcastRole.Peon
        });

        expect(result).toBeFalsy("Peon actions arriving at another peon should not pass the filter.");

    });

    it(`should return false if a leader action arrives at another leader.`, () => {

        const result = filterIncomingBroadcastAction({
            action: {
                dataId: BroadcastFunctionsTestData.dataId01,
                type: leaderActionTypePrefix
            } as BroadcastAction,
            dataId: BroadcastFunctionsTestData.dataId01,
            ownBroadcastRole: BroadcastRole.Leader
        });

        expect(result).toBeFalsy("Leader actions arriving at another leader should not pass the filter.");

    });

    it(`should return true if a leader action arrives at a peon.`, () => {

        const result = filterIncomingBroadcastAction({
            action: {
                dataId: BroadcastFunctionsTestData.dataId01,
                type: leaderActionTypePrefix
            } as BroadcastAction,
            dataId: BroadcastFunctionsTestData.dataId01,
            ownBroadcastRole: BroadcastRole.Peon
        });

        expect(result).toBeTruthy("Leader actions arriving at a peon should pass the filter.");

    });

    it(`should return true if a peon action arrives at a leader.`, () => {

        const result = filterIncomingBroadcastAction({
            action: {
                dataId: BroadcastFunctionsTestData.dataId01,
                type: peonActionTypePrefix
            } as BroadcastAction,
            dataId: BroadcastFunctionsTestData.dataId01,
            ownBroadcastRole: BroadcastRole.Leader
        });

        expect(result).toBeTruthy("Peon actions arriving at a leader should pass the filter.");

    });

});
