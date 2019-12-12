import { createFeatureSelector, createSelector } from "@ngrx/store";
import { requestStoreFeature, RequestStoreState } from "../models/request-store-state.model";

export const requestStateSelector = createFeatureSelector<RequestStoreState>(
    requestStoreFeature
);

export const hasPendingRequestsSelector = createSelector(
    requestStateSelector,
    x => x.requests.pendingRequests > 0
);
