import { InjectionToken, ValueProvider } from "@angular/core";
import {
    defaultHamburgerShellConfig,
    HamburgerShellConfig, overlayHamburgerShellConfig,
    sideNavHamburgerShellConfig
} from "./hamburger-shell-config.model";

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

