import {shouldPrefixAction, ShouldPrefixActionPayload} from "../should-prefix-action.function";
import { BroadcastRole } from "../../models/broadcast-role.model";

describe("shouldPrefixAction", () => {

    const triggeringActionPrefix =  "Example trigger prefix";

    it(`should return whether an action's type should be prefixed based on actual and triggering
    broadcasting roles and triggering prefixes.`, () => {

        const payload: ShouldPrefixActionPayload = {
            action: {
                type: triggeringActionPrefix
            },
            actualBroadcastRole: BroadcastRole.Peon,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: [
                triggeringActionPrefix
            ]
        };

        const result = shouldPrefixAction(payload);

        expect(result).toBeTruthy();

    });

    it(`should return false if the passed action doesn't contain one of the triggering prefixed.`, () => {
        const payload: ShouldPrefixActionPayload = {
            action: {
                type: "Some prefix"
            },
            actualBroadcastRole: BroadcastRole.Peon,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: [
                triggeringActionPrefix
            ]
        };

        const result = shouldPrefixAction(payload);

        expect(result).toBeFalsy();
    });

    it(`should return false if the passed actualBroadcastRole doesn't contain the triggeringBroadcastRole.`, () => {
        const payload: ShouldPrefixActionPayload = {
            action: {
                type: triggeringActionPrefix
            },
            actualBroadcastRole: BroadcastRole.Leader,
            triggeringBroadcastRole: BroadcastRole.Peon,
            triggeringActionPrefixes: [
                triggeringActionPrefix
            ]
        };

        const result = shouldPrefixAction(payload);

        expect(result).toBeFalsy();
    });

});
