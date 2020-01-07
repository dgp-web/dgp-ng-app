import { createFeatureSelector, createSelector } from "@ngrx/store";
import { themeSwitcherStoreFeature } from "../models/theme-switcher-store-feature.model";
import { ThemeSwitcherState } from "../models/theme-switcher-state.model";

export const themeSwitcherFeatureSelector = createFeatureSelector<ThemeSwitcherState>(
    themeSwitcherStoreFeature
);

export const isDarkModeActiveSelector = createSelector(
    themeSwitcherFeatureSelector, x => x.useDarkMode
);
