import { RequestState } from "./models";
import { requestReducer } from "./reducers";
import { registerRequest, resetRequests, unregisterRequest } from "./actions";

describe("requestReducer", () => {

    it(`registerRequest should increment pendingRequests by 1`, () => {

        const initialState: RequestState = {pendingRequests: 0};

        const updatedState = requestReducer(initialState, registerRequest());

        expect(updatedState.pendingRequests)
            .toBe(1);

    });

    it(`unregisterRequest should decrement pendingRequests by 1`, () => {

        const initialState: RequestState = {pendingRequests: 1};

        const updatedState = requestReducer(initialState, unregisterRequest());

        expect(updatedState.pendingRequests)
            .toBe(0);

    });

    it(`resetRequests should set pendingRequests to 0`, () => {

        const initialState: RequestState = {pendingRequests: 2};

        const updatedState = requestReducer(initialState, resetRequests());

        expect(updatedState.pendingRequests)
            .toBe(0);

    });

});
