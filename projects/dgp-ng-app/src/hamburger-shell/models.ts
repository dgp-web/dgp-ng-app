import { InjectionToken, ValueProvider } from "@angular/core";

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


export const HAMBURGER_SHELL_CONFIG = new InjectionToken<HamburgerShellConfig>("HamburgerShellConfig");


export interface HamburgerShellConfigProvider extends ValueProvider {
    provide: typeof HAMBURGER_SHELL_CONFIG;
}

export const sideNavHamburgerShellConfigProvider: HamburgerShellConfigProvider = {
    provide: HAMBURGER_SHELL_CONFIG,
    useValue: sideNavHamburgerShellConfig
};

export const overlayHamburgerShellConfigProvider: HamburgerShellConfigProvider = {
    provide: HAMBURGER_SHELL_CONFIG,
    useValue: overlayHamburgerShellConfig
};

export const defaultHamburgerShellConfigProvider: HamburgerShellConfigProvider = {
    provide: HAMBURGER_SHELL_CONFIG,
    useValue: defaultHamburgerShellConfig
};

export type HamburgerMenuMode = "side" | "over";
export type PageMenuMode = "side" | "over";

export interface HamburgerShellState {
    readonly isHamburgerMenuOpen: boolean;
    readonly hamburgerMenuMode: HamburgerMenuMode;

    readonly isPageMenuOpen: boolean;
    readonly pageMenuMode: PageMenuMode;
}

export const hamburgerShellStoreFeature = "HamburgerShell";
