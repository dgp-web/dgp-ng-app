import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ThemeSwitcherState, themeSwitcherStoreFeature } from "./models";

export const themeSwitcherFeatureSelector = createFeatureSelector<ThemeSwitcherState>(
    themeSwitcherStoreFeature
);

export const isDarkModeActiveSelector = createSelector(
    themeSwitcherFeatureSelector, x => x.useDarkMode
);

export const isDarkModeActive = isDarkModeActiveSelector;
