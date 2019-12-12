import {createFeatureSelector, createSelector} from "@ngrx/store";
import { hamburgerShellStoreFeature } from "../models/hamburger-shell.store-feature";
import { HamburgerShellState } from "../models/hamburger-shell-state.model";

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
