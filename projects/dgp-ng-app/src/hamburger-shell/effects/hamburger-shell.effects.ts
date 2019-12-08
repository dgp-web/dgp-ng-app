import { Inject, Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { debounceTime, map } from "rxjs/operators";
import { BreakpointObserver } from "@angular/cdk/layout";
import { SetHamburgerMenuStateAction, SetListDetailsPageStateAction } from "../actions/hamburger-shell.actions";
import { HAMBURGER_SHELL_CONFIG, HamburgerShellConfig } from "../models";

@Injectable()
export class HamburgerShellEffects {

    @Effect()
    readonly setHamburgerMenuState$ = this.breakpointObserver.observe(
        this.hamburgerShellConfig.hamburgerMenuBreakpoints as string[]
    )
        .pipe(
            debounceTime(50),
            map(result => {
                const isHamburgerMenuOpen = result.matches;
                const hamburgerMenuMode = isHamburgerMenuOpen ? "side" : "over";

                return new SetHamburgerMenuStateAction({
                    isHamburgerMenuOpen,
                    hamburgerMenuMode
                });

            })
        );

    @Effect()
    readonly setListDetailsPageLayout$ = this.breakpointObserver.observe(
        this.hamburgerShellConfig.listDetailsPageMenuBreakpoints as string[]
    )
        .pipe(
            debounceTime(50),
            map(result => {

                const isPageMenuOpen = result.matches;
                const pageMenuMode = isPageMenuOpen ? "side" : "over";

                return new SetListDetailsPageStateAction({
                    isPageMenuOpen,
                    pageMenuMode
                });

            })
        );

    constructor(
        private readonly actions: Actions,
        private readonly breakpointObserver: BreakpointObserver,
        @Inject(HAMBURGER_SHELL_CONFIG)
        private readonly hamburgerShellConfig: HamburgerShellConfig
    ) {
    }

}
