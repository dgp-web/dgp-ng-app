import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createDockingLayout } from "./actions";

@Injectable()
export class DockingLayoutEffects {

    
    readonly createDockingLayout$ = createEffect(() => this.actions$.pipe(
        ofType(createDockingLayout)
    ), {
        dispatch: false
    });

    constructor(
        private readonly actions$: Actions
    ) {
    }

}
