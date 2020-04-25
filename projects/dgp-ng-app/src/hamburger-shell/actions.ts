import { createAction, props } from "@ngrx/store";
import { HamburgerMenuMode, PageMenuMode } from "./models";

// hamburger menu

export const setHamburgerMenuState = createAction("[HamburgerShell] SetHamburgerMenuState", props<{
    readonly isHamburgerMenuOpen: boolean;
    readonly hamburgerMenuMode: HamburgerMenuMode;
}>());

export const toggleHamburgerMenu = createAction("[HamburgerShell] ToggleHamburgerMenu");

export const closeHamburgerMenu = createAction("[HamburgerShell] CloseHamburgerMenu");

// list-details page

export const setListDetailsPageState = createAction("[HamburgerShell] SetListDetailsPageState", props<{
    readonly isPageMenuOpen: boolean;
    readonly pageMenuMode: PageMenuMode;
}>());

export const toggleListDetailsPageMenu = createAction("[HamburgerShell] ToggleListDetailsPageMenu");

export const closeListDetailsMenu = createAction("[HamburgerShell] CloseListDetailsPageMenu");
