import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { first, switchMap, tap } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { toggleDarkMode, updateCurrentInspectorConfig } from "./actions";
import { getCurrentInspectorConfig, isDarkModeActiveSelector } from "./selectors";
import { ThemeSwitcherState } from "./models";
import { withoutDispatch } from "../utils/without-dispatch.constant";
import { DgpContainer } from "../utils/container.component-base";

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

    readonly updateCurrentInspectorConfig$ = createEffect(() => this.actions$.pipe(
        ofType(updateCurrentInspectorConfig),
        switchMap(() => {

            return this.select(getCurrentInspectorConfig).pipe(
                first(),
                tap(inspectorConfig => {
                    localStorage.setItem("dgpInspectorConfig", JSON.stringify(inspectorConfig));
                })
            );

        })
    ), withoutDispatch);

    constructor(
        private readonly actions$: Actions,
        protected readonly store: Store<ThemeSwitcherState>,
    ) {
        super(store);
    }

}
