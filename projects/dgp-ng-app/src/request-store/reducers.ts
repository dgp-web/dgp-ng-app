import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { RequestStoreState } from "./models";
import { registerRequest, resetRequests, unregisterRequest } from "./actions";

export const requestReducer = createReducer({pendingRequests: 0},
    on(registerRequest, state => {
        return {
            pendingRequests: state.pendingRequests + 1
        };
    }),
    on(unregisterRequest, state => {
        return {
            pendingRequests: state.pendingRequests - 1
        };
    }),
    on(resetRequests, () => {
        return {
            pendingRequests: 0
        };
    })
);

export const requestStoreReducer: ActionReducerMap<RequestStoreState> = {
    requests: requestReducer
};
