import { Action, createAction, props } from "@ngrx/store";
import { HamburgerMenuMode, PageMenuMode } from "../models/hamburger-shell-state.model";

// hamburger menu

export const setHamburgerMenuState = createAction("[HamburgerShell] SetHamburgerMenuState", props<{
    readonly payload: {
        readonly isHamburgerMenuOpen: boolean;
        readonly hamburgerMenuMode: HamburgerMenuMode;
    };
}>());

export const toggleHamburgerMenu = createAction("[HamburgerShell] ToggleHamburgerMenu");

export const closeHamburgerMenu = createAction("[HamburgerShell] CloseHamburgerMenu");

// list-details page

export const setListDetailsPageStateActionType = "[HamburgerShell] SetListDetailsPageState";

export class SetListDetailsPageStateAction implements Action {
    readonly type = setListDetailsPageStateActionType;

    constructor(public readonly payload: {
        readonly isPageMenuOpen: boolean;
        readonly pageMenuMode: PageMenuMode;
    }) {
    }
}

export const toggleListDetailsPageMenuActionType = "[HamburgerShell] ToggleListDetailsPageMenu";

export class ToggleListDetailsPageMenuAction implements Action {
    readonly type = toggleListDetailsPageMenuActionType;
}

export const closeListDetailsMenuActionType = "[HamburgerShell] CloseListDetailsPageMenu";

export class CloseListDetailsMenuAction implements Action {
    readonly type = closeListDetailsMenuActionType;
}

export type HamburgerShellActions =
    | SetListDetailsPageStateAction
    | ToggleListDetailsPageMenuAction
    | CloseListDetailsMenuAction;
