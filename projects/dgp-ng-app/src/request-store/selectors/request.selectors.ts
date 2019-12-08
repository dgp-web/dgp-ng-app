
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { requestStoreFeature, RequestStoreState } from "../models";

export const requestStateSelector = createFeatureSelector<RequestStoreState>(
    requestStoreFeature
);

export const hasPendingRequestsSelector = createSelector(
    requestStateSelector,
    x => x.requests.pendingRequests > 0
);
