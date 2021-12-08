import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { appEntityStore } from "../../../store";
import { map } from "rxjs/operators";
import { updateUser } from "./actions";

@Injectable()
export class BroadcastDocsEffects {

    readonly updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(updateUser),
        map(action => {
            return appEntityStore.actions.composeEntityActions({
                update: {
                    user: {
                        [action.user.userId]: action.user
                    }
                }
            });
        })
    ));

    constructor(
        private readonly actions$: Actions
    ) {
    }

}
