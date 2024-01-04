import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, first, skip, switchMap, tap } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { toggleCompactTheme, toggleDarkMode } from "./actions";
import { getCurrentInspectorConfig, isCompactThemeActive, isDarkModeActiveSelector } from "./selectors";
import { THEME_SWITCHER_CONFIG, ThemeSwitcherConfig, ThemeSwitcherState } from "./models";
import { withoutDispatch } from "../utils/without-dispatch.constant";
import { DgpContainer } from "../utils/container.component-base";
import { distinctUntilHashChanged } from "../utils/distinct-until-hash-changed.function";
import { of } from "rxjs";

@Injectable()
export class ThemeSwitcherEffects extends DgpContainer<ThemeSwitcherState> {

    readonly toggleDarkMode$ = createEffect(() => this.actions$.pipe(
        ofType(toggleDarkMode),
        switchMap(() => {

            return this.store.pipe(
                select(isDarkModeActiveSelector),
                first(),
                tap(isDarkModeActive => {
                    localStorage.setItem("isDarkModeActive", JSON.stringify(isDarkModeActive));
                })
            );

        })
    ), withoutDispatch);

    readonly toggleCompactTheme$ = createEffect(() => this.actions$.pipe(
        ofType(toggleCompactTheme),
        switchMap(() => {

            return this.store.pipe(
                select(isCompactThemeActive),
                first(),
                tap(useCompactTheme => {
                    localStorage.setItem("useCompactTheme", JSON.stringify(useCompactTheme));
                })
            );

        })
    ), withoutDispatch);

    readonly updateCurrentInspectorConfig$ = createEffect(() => of(this.themeSwitcherConfig).pipe(
        filter(x => x.components.includes("inspector")),
        switchMap(() => this.select(getCurrentInspectorConfig).pipe(
            skip(1),
            distinctUntilHashChanged(),
            tap(inspectorConfig => {
                localStorage.setItem("dgpInspectorConfig", JSON.stringify(inspectorConfig));
            })
        ))
    ), withoutDispatch);

    constructor(
        private readonly actions$: Actions,
        protected readonly store: Store<ThemeSwitcherState>,
        @Inject(THEME_SWITCHER_CONFIG)
        private readonly themeSwitcherConfig: ThemeSwitcherConfig
    ) {
        super(store);
    }

}
