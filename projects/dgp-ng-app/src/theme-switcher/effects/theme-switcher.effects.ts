import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {toggleDarkModeActionType} from "../actions";
import {first, switchMap, tap} from "rxjs/operators";
import {ThemeSwitcherState} from "../models";
import {select, Store} from "@ngrx/store";
import {isDarkModeActiveSelector} from "../selectors";

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
