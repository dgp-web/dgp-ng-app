import {prefixAction, PrefixActionPayload} from "../prefix-action.function";

describe("prefixAction", () => {

    const payload: PrefixActionPayload = {
        action: {
            type: "Example type"
        },
        prefix: "Example prefix"
    };

    it(`should return an action with a prefixed type.`, () => {
        const prefixedAction = prefixAction(payload);
        expect(prefixedAction.type).toBe(payload.prefix + payload.action.type);
    });

    it(`should leave the passed action unmodified.`, () => {
        const prefixedAction = prefixAction(payload);
        expect(payload.action).not.toBe(prefixedAction);
    });

});
