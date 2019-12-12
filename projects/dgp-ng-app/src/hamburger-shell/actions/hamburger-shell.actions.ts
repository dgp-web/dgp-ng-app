import { Action } from "@ngrx/store";
import { HamburgerMenuMode, PageMenuMode } from "../models/hamburger-shell-state.model";

// hamburger menu

export const setHamburgerMenuStateActionType = "[HamburgerShell] SetHamburgerMenuState";

export class SetHamburgerMenuStateAction implements Action {
  readonly type = setHamburgerMenuStateActionType;

  constructor(public readonly payload: {
      readonly isHamburgerMenuOpen: boolean;
      readonly hamburgerMenuMode: HamburgerMenuMode;
  }) {}
}

export const toggleHamburgerMenuActionType = "[HamburgerShell] ToggleHamburgerMenu";

export class ToggleHamburgerMenuAction implements Action {
  readonly type = toggleHamburgerMenuActionType;
}

export const closeHamburgerMenuActionType = "[HamburgerShell] CloseHamburgerMenu";

export class CloseHamburgerMenuAction implements Action {
  readonly type = closeHamburgerMenuActionType;
}

// list-details page

export const setListDetailsPageStateActionType = "[HamburgerShell] SetListDetailsPageState";

export class SetListDetailsPageStateAction implements Action {
    readonly type = setListDetailsPageStateActionType;

    constructor(public readonly payload: {
        readonly isPageMenuOpen: boolean;
        readonly pageMenuMode: PageMenuMode;
    }) {}
}

export const toggleListDetailsPageMenuActionType = "[HamburgerShell] ToggleListDetailsPageMenu";

export class ToggleListDetailsPageMenuAction implements Action {
    readonly type = toggleListDetailsPageMenuActionType;
}

export const closeListDetailsMenuActionType = "[HamburgerShell] CloseListDetailsPageMenu";

export class CloseListDetailsMenuAction implements Action {
    readonly type = closeListDetailsMenuActionType;
}

export type HamburgerShellActions = SetHamburgerMenuStateAction
    | ToggleHamburgerMenuAction
    | CloseHamburgerMenuAction
    | SetListDetailsPageStateAction
    | ToggleListDetailsPageMenuAction
    | CloseListDetailsMenuAction;
