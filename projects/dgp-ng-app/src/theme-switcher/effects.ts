import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {first, switchMap, tap} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import { toggleDarkMode } from "./actions";
import { isDarkModeActiveSelector } from "./selectors";
import { ThemeSwitcherState } from "./models";

@Injectable()
export class ThemeSwitcherEffects {

    
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
    ), {
        dispatch: false
    });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<ThemeSwitcherState>,
    ) {
    }

}
