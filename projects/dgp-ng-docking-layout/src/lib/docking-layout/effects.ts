import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { createDockingLayout } from "./actions";

@Injectable()
export class DockingLayoutEffects {

    @Effect({
        dispatch: false
    })
    readonly createDockingLayout$ = this.actions$.pipe(
        ofType(createDockingLayout)
    );

    constructor(
        private readonly actions$: Actions
    ) {
    }

}
