import {createFeatureSelector, createSelector} from "@ngrx/store";
import {HamburgerShellState, hamburgerShellStoreFeature} from "../models";

export const hamburgerShellFeatureSelector = createFeatureSelector<HamburgerShellState>(
    hamburgerShellStoreFeature
);

export const hamburgerMenuModeSelector = createSelector(
    hamburgerShellFeatureSelector, x => x.hamburgerMenuMode
);

export const isHamburgerMenuOpenSelector = createSelector(
    hamburgerShellFeatureSelector, x => x.isHamburgerMenuOpen
);

export const pageMenuModeSelector = createSelector(
    hamburgerShellFeatureSelector, x => x.pageMenuMode
);

export const isPageMenuOpenSelector = createSelector(
    hamburgerShellFeatureSelector, x => x.isPageMenuOpen
);
