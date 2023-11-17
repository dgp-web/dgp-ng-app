import { createAction, props } from "@ngrx/store";
import { InspectorConfig } from "../inspector/models";

export const toggleDarkMode = createAction("[ThemeSwitcher] ToggleDarkMode");
export const setIsDarkModeActive = createAction("[ThemeSwitcher] SetIsDarkModeActive", props<{ readonly isDarkModeActive: boolean }>());
export const updateCurrentInspectorConfig = createAction(
    "[ThemeSwitcher] UpdateCurrentInspectorConfig",
    props<{
        readonly inspectorConfig?: InspectorConfig;
    }>()
);
export const toggleCompactTheme = createAction("[ThemeSwitcher] ToggleCompactTheme");
export const setIsCompactThemeActive = createAction("[ThemeSwitcher] SetIsCompactThemeActive", props<{
    readonly useCompactTheme: boolean
}>());
