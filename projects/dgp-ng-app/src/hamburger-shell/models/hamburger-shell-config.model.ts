import { Breakpoints } from "@angular/cdk/layout";

export enum HamburgerShellMode {
    Responsive,
    Overlay,
    SideNav
}

export enum ListDetailsPageMode {
    Responsive,
    Overlay,
    SideNav
}

export interface HamburgerShellConfig {
    readonly hamburgerShellMode: HamburgerShellMode;
    // Relevant for responsive mode
    readonly hamburgerMenuBreakpoints?: ReadonlyArray<string>;

    readonly listDetailsPageMode: ListDetailsPageMode;
    // Relevant for responsive mode
    readonly listDetailsPageMenuBreakpoints?: ReadonlyArray<string>;
}

export const responsiveHamburgerShellConfig: HamburgerShellConfig = {
    hamburgerShellMode: HamburgerShellMode.Responsive,

    hamburgerMenuBreakpoints: [
        Breakpoints.XLarge
    ],

    listDetailsPageMode: ListDetailsPageMode.Responsive,

    listDetailsPageMenuBreakpoints: [
        Breakpoints.Large,
        Breakpoints.XLarge
    ]
};

export const sideNavHamburgerShellConfig: HamburgerShellConfig = {
    hamburgerShellMode: HamburgerShellMode.SideNav,
    listDetailsPageMode: ListDetailsPageMode.SideNav
};

export const overlayHamburgerShellConfig: HamburgerShellConfig = {
    hamburgerShellMode: HamburgerShellMode.Overlay,
    listDetailsPageMode: ListDetailsPageMode.Overlay
};

export const defaultHamburgerShellConfig = responsiveHamburgerShellConfig;
