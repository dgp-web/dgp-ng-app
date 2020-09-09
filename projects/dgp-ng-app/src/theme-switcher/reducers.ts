import { createReducer, on } from "@ngrx/store";
import { setIsDarkModeActive, toggleDarkMode } from "./actions";
import { ThemeSwitcherState } from "./models";

export const initialThemeSwitcherState: ThemeSwitcherState = {
    useDarkMode: true
};

export const themeSwitcherReducer = createReducer(initialThemeSwitcherState,
    on(setIsDarkModeActive, (state, action) => {
        return {
            ...state,
            useDarkMode: action.isDarkModeActive
        };
    }),
    on(toggleDarkMode, (state) => {
        return {
            ...state,
            useDarkMode: !state.useDarkMode
        };
    })
);
