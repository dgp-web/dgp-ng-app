import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {first, switchMap, tap} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import { toggleDarkModeActionType } from "../actions/theme-switcher.actions";
import { isDarkModeActiveSelector } from "../selectors/theme-switcher.selectors";
import { ThemeSwitcherState } from "../models/theme-switcher-state.model";

@Injectable()
export class ThemeSwitcherEffects {

    @Effect({
        dispatch: false
    })
    readonly toggleDarkMode$ = this.actions$.pipe(
        ofType(toggleDarkModeActionType),
        switchMap(() => {

            return this.store.pipe(
                select(isDarkModeActiveSelector),
                first(),
                tap(isDarkModeActive => {
                    localStorage.setItem("isDarkModeActive", JSON.stringify(isDarkModeActive));
                })
            );

        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<ThemeSwitcherState>,
    ) {
    }

}
