import { InjectionToken } from "@angular/core";
import { InspectorConfig } from "../inspector/models";

export interface ThemeSwitcherState {
    readonly useDarkMode: boolean;
    /**
     * Components
     */
    readonly inspector?: InspectorConfig;
}

export interface ThemeSwitcherConfig {
    readonly darkThemeClassName: string;
}

export const defaultThemeSwitcherConfig: ThemeSwitcherConfig = {
    darkThemeClassName: "dark-theme"
};

export const THEME_SWITCHER_CONFIG = new InjectionToken<ThemeSwitcherConfig>("ThemeSwitcherConfig");

export const themeSwitcherStoreFeature = "ThemeSwitcher";
