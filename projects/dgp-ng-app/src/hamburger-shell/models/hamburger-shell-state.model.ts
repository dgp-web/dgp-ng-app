export type HamburgerMenuMode = "side" | "over";
export type PageMenuMode = "side" | "over";

export interface HamburgerShellState {
    readonly isHamburgerMenuOpen: boolean;
    readonly hamburgerMenuMode: HamburgerMenuMode;

    readonly isPageMenuOpen: boolean;
    readonly pageMenuMode: PageMenuMode;
}
