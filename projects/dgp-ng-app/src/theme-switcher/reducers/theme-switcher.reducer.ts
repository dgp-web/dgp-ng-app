import {ThemeSwitcherState} from "../models";
import {FactoryProvider, InjectionToken} from "@angular/core";
import {ActionReducer} from "@ngrx/store";
import {ThemeSwitcherActions} from "../actions";

const initialState: ThemeSwitcherState = {
    useDarkMode: false
};


export function _themeSwitcherReducer(
    state: ThemeSwitcherState = initialState,
    action: ThemeSwitcherActions
): ThemeSwitcherState {

    switch (action.type) {

        case "[ThemeSwitcher] ToggleDarkMode": {
            return {
                ...state,
                useDarkMode: !state.useDarkMode
            };
        }

        case "[ThemeSwitcher] SetIsDarkModeActive": {
            return {
                ...state,
                useDarkMode: action.isDarkModeActive
            };
        }

        default:
            return state;
    }

}


export const themeSwitcherReducer = new InjectionToken<ActionReducer<ThemeSwitcherState>>("ThemeSwitcherReducer");

export function themeSwitcherReducerFactory(): ActionReducer<ThemeSwitcherState> {
    return _themeSwitcherReducer;
}

export const themeSwitcherReducerProviders = [{
    provide: themeSwitcherReducer,
    useFactory: themeSwitcherReducerFactory
} as FactoryProvider];

