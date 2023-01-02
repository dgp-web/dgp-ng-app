import { createReducer, on } from "@ngrx/store";
import { setIsDarkModeActive, toggleDarkMode, updateCurrentInspectorConfig } from "./actions";
import { ThemeSwitcherState } from "./models";
import { inspectorDefaultConfig } from "../inspector/constants";

export const initialThemeSwitcherState: ThemeSwitcherState = {
    useDarkMode: true,
    inspector: inspectorDefaultConfig
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
    }),
    on(updateCurrentInspectorConfig, (state, action) => {
        return {
            ...state,
            inspector: {
                ...state.inspector,
                ...action.inspectorConfig
            }
        };
    })
);
