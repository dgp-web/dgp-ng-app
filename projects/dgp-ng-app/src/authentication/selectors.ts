import { createFeatureSelector, createSelector } from "@ngrx/store";
import { isNullOrUndefined } from "util";
import { AuthenticationState, authenticationStoreFeature } from "./models";

export const authenticationFeatureSelector = createFeatureSelector<AuthenticationState>(authenticationStoreFeature);

export const getIsAuthenticatedSelector = createSelector(
    authenticationFeatureSelector,
    x => x.success
);

export const isAuthenticated = getIsAuthenticatedSelector;

export const getAuthenticatedUserSelector = createSelector(
    authenticationFeatureSelector,
    x => x.user
);

export const getAuthenticatedUser = getAuthenticatedUserSelector;

export const getCachedInitialUrlSelector = createSelector(
    authenticationFeatureSelector,
    x => x.initialUrl
);

export const hasCachedInitialUrlSelector = createSelector(
    getCachedInitialUrlSelector,
    x => !isNullOrUndefined(x)
);

export const isInitialized = createSelector(
    authenticationFeatureSelector, x => x.isInitialized === true
);
