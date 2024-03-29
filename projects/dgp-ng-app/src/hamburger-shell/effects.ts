import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";
import { BreakpointObserver } from "@angular/cdk/layout";
import { setHamburgerMenuState, setListDetailsPageState } from "./actions";
import {
    HamburgerShellConfig, HamburgerShellMode, ListDetailsPageMode,
    HamburgerShellState, HAMBURGER_SHELL_CONFIG
} from "./models";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

@Injectable()
export class HamburgerShellEffects {

    
    readonly setHamburgerMenuState$ = createEffect(() => of(this.hamburgerShellConfig.hamburgerShellMode)
        .pipe(
            filter(x => x === HamburgerShellMode.Responsive),
            switchMap(() => {
                return this.breakpointObserver.observe(
                    this.hamburgerShellConfig.hamburgerMenuBreakpoints as string[]
                );
            }),
            debounceTime(50),
            map(result => {
                const isHamburgerMenuOpen = result.matches;
                const hamburgerMenuMode = isHamburgerMenuOpen ? "side" : "over";

                return setHamburgerMenuState({
                    isHamburgerMenuOpen,
                    hamburgerMenuMode
                });

            })
        ));

    
    readonly setListDetailsPageLayout$ = createEffect(() => of(this.hamburgerShellConfig.listDetailsPageMode)
        .pipe(
            filter(x => x === ListDetailsPageMode.Responsive),
            switchMap(() => {
                return this.breakpointObserver.observe(
                    this.hamburgerShellConfig.listDetailsPageMenuBreakpoints as string[]
                );
            }),
            debounceTime(50),
            map(result => {

                const isPageMenuOpen = result.matches;
                const pageMenuMode = isPageMenuOpen ? "side" : "over";

                return setListDetailsPageState({
                    isPageMenuOpen,
                    pageMenuMode
                });

            })
        ));

    constructor(
        private readonly actions: Actions,
        private readonly store: Store<HamburgerShellState>,
        private readonly breakpointObserver: BreakpointObserver,
        @Inject(HAMBURGER_SHELL_CONFIG)
        private readonly hamburgerShellConfig: HamburgerShellConfig
    ) {
        if (hamburgerShellConfig.hamburgerShellMode === HamburgerShellMode.SideNav) {
            this.store.dispatch(setHamburgerMenuState({
                isHamburgerMenuOpen: true,
                hamburgerMenuMode: "side"
            }));
        } else if (hamburgerShellConfig.hamburgerShellMode === HamburgerShellMode.Overlay) {
            this.store.dispatch(setHamburgerMenuState({
                isHamburgerMenuOpen: false,
                hamburgerMenuMode: "over"
            }));
        }

        if (hamburgerShellConfig.listDetailsPageMode === ListDetailsPageMode.SideNav) {
            this.store.dispatch(setListDetailsPageState({
                isPageMenuOpen: true,
                pageMenuMode: "side"
            }));
        } else if (hamburgerShellConfig.listDetailsPageMode === ListDetailsPageMode.Overlay) {
            this.store.dispatch(setListDetailsPageState({
                isPageMenuOpen: false,
                pageMenuMode: "over"
            }));
        }
    }

}
