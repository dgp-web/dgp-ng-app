import { InjectionToken } from "@angular/core";
import { InspectorConfig } from "../inspector/models";
import { Many } from "data-modeling";

export interface ThemeSwitcherState {
    readonly useDarkMode: boolean;
    readonly useCompactTheme: boolean;
    /**
     * Components
     */
    readonly inspector?: InspectorConfig;
}

export interface ThemeSwitcherConfig {
    readonly darkThemeClassName: string;
    readonly isDarkModeActiveLocalStorageKey?: string;

    readonly compactThemeClassName: string;
    readonly components: Many<string>;
}

export const defaultThemeSwitcherConfig: ThemeSwitcherConfig = {
    darkThemeClassName: "dark-theme",
    isDarkModeActiveLocalStorageKey: "isDarkModeActive",
    compactThemeClassName: "compact-theme",
    components: []
};

export const THEME_SWITCHER_CONFIG = new InjectionToken<ThemeSwitcherConfig>("ThemeSwitcherConfig");

export const themeSwitcherStoreFeature = "ThemeSwitcher";
