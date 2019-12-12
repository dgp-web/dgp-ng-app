import { InjectionToken } from "@angular/core";

export interface ThemeSwitcherConfig {
    readonly darkThemeClassName: string;
}

export const defaultThemeSwitcherConfig: ThemeSwitcherConfig = {
    darkThemeClassName: "dark-theme"
};

export const THEME_SWITCHER_CONFIG = new InjectionToken<ThemeSwitcherConfig>("ThemeSwitcherConfig");
