import { createFeatureSelector, createSelector } from "@ngrx/store";
import { themeSwitcherStoreFeature } from "./theme-switcher-store-feature.model";
import { ThemeSwitcherState } from "./theme-switcher-state.model";

export const themeSwitcherFeatureSelector = createFeatureSelector<ThemeSwitcherState>(
    themeSwitcherStoreFeature
);

export const isDarkModeActiveSelector = createSelector(
    themeSwitcherFeatureSelector, x => x.useDarkMode
);

export const isDarkModeActive = isDarkModeActiveSelector;
