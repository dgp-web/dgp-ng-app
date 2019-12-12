import { Action } from "@ngrx/store";

export const toggleDarkModeActionType = "[ThemeSwitcher] ToggleDarkMode";

export class ToggleDarkModeAction implements Action {
    readonly type = toggleDarkModeActionType;
}

export const setIsDarkModeActiveActionType = "[ThemeSwitcher] SetIsDarkModeActive";

export class SetIsDarkModeActiveAction implements Action {
    readonly type = setIsDarkModeActiveActionType;

    constructor(
        public readonly isDarkModeActive: boolean
    ) {
    }
}

export type ThemeSwitcherActions = ToggleDarkModeAction | SetIsDarkModeActiveAction;
