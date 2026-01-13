import { Observable } from "rxjs";

export enum DrawerMode {
    Side = "side",
    Over = "over"
}

export interface IsDrawerOpenInfo {
    readonly isDrawerOpen: boolean;
}

export interface IsDrawerOpenInfoProperty extends IsDrawerOpenInfo {
    readonly isDrawerOpenChange: Observable<boolean>;
}

export interface DrawerLayout extends IsDrawerOpenInfo {
    readonly drawerMode: DrawerMode;
}

export enum DrawerLayoutMenuTogglePosition {
    /**
     * Places the toggle to the right of the menu and centers it vertically.
     */
    RightToMenuAndVerticallyCentered = "rightToMenuAndVerticallyCentered",
    /**
     * Removes the default toggle so the user can place the component elsewhere
     */
    Custom = "custom"
}
