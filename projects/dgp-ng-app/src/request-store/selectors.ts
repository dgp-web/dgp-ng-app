import { createFeatureSelector, createSelector } from "@ngrx/store";
import { requestStoreFeature, RequestStoreState } from "./models";

export const requestStateSelector = createFeatureSelector<RequestStoreState>(
    requestStoreFeature
);

export const hasPendingRequests = createSelector(
    requestStateSelector,
    x => x.requests.pendingRequests > 0
);

export const hasPendingRequestsSelector = createSelector(hasPendingRequests, x => x);
