import { InjectionToken } from "@angular/core";
import { InspectorConfig } from "../inspector/models";
import { Many } from "data-modeling";

export interface ThemeSwitcherState {
    readonly useDarkMode: boolean;
    /**
     * Components
     */
    readonly inspector?: InspectorConfig;
}

export interface ThemeSwitcherConfig {
    readonly darkThemeClassName: string;
    readonly components: Many<string>;
}

export const defaultThemeSwitcherConfig: ThemeSwitcherConfig = {
    darkThemeClassName: "dark-theme",
    components: []
};

export const THEME_SWITCHER_CONFIG = new InjectionToken<ThemeSwitcherConfig>("ThemeSwitcherConfig");

export const themeSwitcherStoreFeature = "ThemeSwitcher";
