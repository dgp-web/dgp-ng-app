import {
    closeHamburgerMenu, closeListDetailsMenu, setHamburgerMenuState, setListDetailsPageState,
    toggleHamburgerMenu, toggleListDetailsPageMenu
} from "../actions";
import { FactoryProvider, InjectionToken } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { HamburgerShellState } from "../models";

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
            hamburgerMenuMode: action.hamburgerMenuMode,
            isHamburgerMenuOpen: action.isHamburgerMenuOpen
        };
    })),
    on(toggleHamburgerMenu, ((state) => {
        return {
            ...state,
            isHamburgerMenuOpen: !state.isHamburgerMenuOpen
        };
    })),
    on(closeHamburgerMenu, ((state) => {
        return {
            ...state,
            isHamburgerMenuOpen: false
        };
    })),
    on(setListDetailsPageState, ((state, action) => {
        return {
            ...state,
            pageMenuMode: action.pageMenuMode,
            isPageMenuOpen: action.isPageMenuOpen,
        };
    })),
    on(toggleListDetailsPageMenu, ((state) => {
        return {
            ...state,
            isPageMenuOpen: !state.isPageMenuOpen
        };
    })),
    on(closeListDetailsMenu, ((state) => {
        return {
            ...state,
            isPageMenuOpen: false
        };
    }))
);

export const hamburgerShellReducer = new InjectionToken<ActionReducer<HamburgerShellState>>("hamburgerShellReducer");

export function hamburgerShellReducerFactory() {
    return hamburgerShellReducerImpl;
}

export const hamburgerShellReducerProvider: FactoryProvider = {
    provide: hamburgerShellReducer,
    useFactory: hamburgerShellReducerFactory
};

