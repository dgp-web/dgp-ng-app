import { Breakpoints } from "@angular/cdk/layout";

export interface HamburgerShellConfig {
    readonly hamburgerMenuBreakpoints: ReadonlyArray<string>;
    readonly listDetailsPageMenuBreakpoints: ReadonlyArray<string>;
}

export const defaultHamburgerShellConfig: HamburgerShellConfig = {
    hamburgerMenuBreakpoints: [
        Breakpoints.XLarge
    ],

    listDetailsPageMenuBreakpoints: [
        Breakpoints.Large,
        Breakpoints.XLarge
    ]
};
