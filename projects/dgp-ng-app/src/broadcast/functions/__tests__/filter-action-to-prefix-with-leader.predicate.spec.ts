import {filterActionToPrefixWithLeaderPredicate} from "../filter-action-to-prefix-with-leader.predicate";
import { compositeActionTypePrefix, trackRequestActionTypePrefix } from "../../actions";
import { authenticationActionTypePrefix } from "../../../authentication/actions";

describe("filterActionToPrefixWithLeaderPredicate", () => {

    it(`should filter actions prefixed with [Composite] or [Request].`, () => {

        expect(
            filterActionToPrefixWithLeaderPredicate({
                type: compositeActionTypePrefix
            })
        ).toBeTruthy();

        expect(
            filterActionToPrefixWithLeaderPredicate({
                type: trackRequestActionTypePrefix
            })
        ).toBeTruthy();

        expect(
            filterActionToPrefixWithLeaderPredicate({
                type: authenticationActionTypePrefix
            })
        ).toBeTruthy();

        expect(
            filterActionToPrefixWithLeaderPredicate({
                type: "ABC"
            })
        ).toBeFalsy();

    });


});
