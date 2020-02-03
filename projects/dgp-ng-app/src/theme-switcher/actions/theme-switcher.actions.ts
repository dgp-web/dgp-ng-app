import { createAction, props } from "@ngrx/store";

export const toggleDarkMode = createAction("[ThemeSwitcher] ToggleDarkMode");
export const setIsDarkModeActive = createAction("[ThemeSwitcher] SetIsDarkModeActive", props<{ readonly isDarkModeActive: boolean }>());
