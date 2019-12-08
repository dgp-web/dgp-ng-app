import { InjectionToken, ValueProvider } from "@angular/core";
import { defaultHamburgerShellConfig, HamburgerShellConfig } from "./hamburger-shell-config.model";

export const HAMBURGER_SHELL_CONFIG = new InjectionToken<HamburgerShellConfig>("HamburgerShellConfig");


export interface HamburgerShellConfigProvider extends ValueProvider {
    provide: typeof HAMBURGER_SHELL_CONFIG;
}

export const defaultHamburgerShellConfigProvider: HamburgerShellConfigProvider = {
    provide: HAMBURGER_SHELL_CONFIG,
    useValue: defaultHamburgerShellConfig
};

