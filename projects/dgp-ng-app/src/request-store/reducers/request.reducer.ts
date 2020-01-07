import { RequestState } from "../models/request-state.model";
import {
    registerRequestActionType,
    resetRequestsActionType,
    unregisterRequestActionType
} from "../actions/request.actions";
import { Action } from "@ngrx/store";

export const requestReducer = (state: RequestState = {pendingRequests: 0}, action: Action): RequestState => {
    switch (action.type) {

        case registerRequestActionType: {
            return {
                pendingRequests: state.pendingRequests + 1
            };
        }

        case unregisterRequestActionType: {
            return {
                pendingRequests: state.pendingRequests - 1
            };
        }

        case resetRequestsActionType: {
            return {
                pendingRequests: 0
            };
        }

        default: {
            return state;
        }
    }
};