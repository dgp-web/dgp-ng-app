import { RequestState } from "./request-state.model";

export interface RequestStoreState {
    readonly requests: RequestState;
}

export const requestStoreFeature = "Requests";
