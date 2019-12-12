import { RequestState } from "../models/request-state.model";
import {
    registerRequestActionType, RequestBookkeepingActions,
    resetRequestsActionType,
    unregisterRequestActionType
} from "../actions/request.actions";

export const requestReducer = (state: RequestState = {pendingRequests: 0}, action: RequestBookkeepingActions): RequestState => {
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
