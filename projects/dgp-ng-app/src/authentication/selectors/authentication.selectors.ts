import { createFeatureSelector, createSelector } from "@ngrx/store";
import { isNullOrUndefined } from "util";
import { authenticationStoreFeature } from "../models/authentication-store-feature";
import { AuthenticationState } from "../models/authentication-result.model";

export const authenticationFeatureSelector = createFeatureSelector<AuthenticationState>(authenticationStoreFeature);

export const getIsAuthenticatedSelector = createSelector(
    authenticationFeatureSelector,
    x => x.success
);
export const getAuthenticatedUserSelector = createSelector(
    authenticationFeatureSelector,
    x => x.user
);
export const getCachedInitialUrlSelector = createSelector(
    authenticationFeatureSelector,
    x => x.initialUrl
);

export const hasCachedInitialUrlSelector = createSelector(
    getCachedInitialUrlSelector,
    x => !isNullOrUndefined(x)
);
