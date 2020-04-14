export interface RequestState {
    readonly pendingRequests: number;
}

export interface RequestStoreState {
    readonly requests: RequestState;
}

export const requestStoreFeature = "Requests";
