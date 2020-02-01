import { FactoryProvider, InjectionToken } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { ThemeSwitcherState } from "../models/theme-switcher-state.model";
import { setIsDarkModeActive, toggleDarkMode } from "../actions/theme-switcher.actions";

const initialState: ThemeSwitcherState = {
    useDarkMode: false
};

export const themeSwitcherReducerImpl = createReducer(initialState,
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

export const themeSwitcherReducer = new InjectionToken<ActionReducer<ThemeSwitcherState>>("ThemeSwitcherReducer");

export function themeSwitcherReducerFactory() {
    return themeSwitcherReducerImpl;
}

export const themeSwitcherReducerProvider: FactoryProvider = {
    provide: themeSwitcherReducer,
    useFactory: themeSwitcherReducerFactory
};

