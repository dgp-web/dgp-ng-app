import { closeHamburgerMenu, HamburgerShellActions, setHamburgerMenuState, toggleHamburgerMenu } from "../actions/hamburger-shell.actions";
import {FactoryProvider, InjectionToken} from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { HamburgerShellState } from "../models/hamburger-shell-state.model";

const initialState: HamburgerShellState = {
    hamburgerMenuMode: "side",
    isHamburgerMenuOpen: true,
    pageMenuMode: "side",
    isPageMenuOpen: true
};

export const hamburgerShellReducerImpl = createReducer(initialState,
    on(setHamburgerMenuState, ((state, action) => {
        return {
            ...state,
            ...action.payload
        };
    })),
    on(toggleHamburgerMenu, ((state, action) => {
        return {
            ...state,
            isHamburgerMenuOpen: !state.isHamburgerMenuOpen
        };
    })),
    on(closeHamburgerMenu, ((state, action) => {
        return {
            ...state,
            isHamburgerMenuOpen: false
        };
    }))
);

export function _hamburgerShellReducer(
    state: HamburgerShellState = initialState,
    action: HamburgerShellActions
): HamburgerShellState {

    switch (action.type) {
       /* case "[HamburgerShell] SetHamburgerMenuState": {
            return {
                ...state,
                ...action.payload
            };
        }
        case "[HamburgerShell] ToggleHamburgerMenu": {
            return {
                ...state,
                isHamburgerMenuOpen: !state.isHamburgerMenuOpen
            };
        }
        case "[HamburgerShell] CloseHamburgerMenu": {
            return {
                ...state,
                isHamburgerMenuOpen: false
            };
        }*/
        case "[HamburgerShell] SetListDetailsPageState": {
            return {
                ...state,
                ...action.payload
            };
        }
        case "[HamburgerShell] ToggleListDetailsPageMenu": {
            return {
                ...state,
                isPageMenuOpen: !state.isPageMenuOpen
            };
        }
        case "[HamburgerShell] CloseListDetailsPageMenu": {
            return {
                ...state,
                isPageMenuOpen: false
            };
        }
        default: return state;
    }

}


export const hamburgerShellReducer = new InjectionToken<ActionReducer<HamburgerShellState>>("hamburgerShellReducer");

export function hamburgerShellReducerFactory(): ActionReducer<HamburgerShellState> {
    return _hamburgerShellReducer;
}

export const hamburgerShellReducerProviders = [{
    provide: hamburgerShellReducer,
    useFactory: hamburgerShellReducerFactory
} as FactoryProvider];

