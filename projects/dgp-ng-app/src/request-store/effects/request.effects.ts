import { Inject, Injectable } from "@angular/core";
import { Observer } from "rxjs";
import { Store } from "@ngrx/store";
import { Effect, ofType } from "@ngrx/effects";
import { concatMap } from "rxjs/operators";
import { Actions } from "@ngrx/effects";
import {
    scheduleRequestActionType,
    ScheduleRequestAction,
    RegisterRequestAction,
    UnregisterRequestAction
} from "../actions";
import { observeRequest } from "../functions";
import { RequestStoreState } from "../models";

@Injectable()
export class RequestEffects {

    /**
     * A request-processing queue that processes requests
     * in the order they arrive and keeps track of how
     * many requests are currently running
     */
    @Effect({
        dispatch: false
    })
    scheduleRequest$ = this.actions$
        .pipe(
            ofType(scheduleRequestActionType),
            concatMap(
                (action: ScheduleRequestAction<any>) => {

                    return observeRequest({
                        request$: action.payload.request$,
                        observer: this.getRequestObserver()
                    });

                }
            )
        );

    private getRequestObserver(): Observer<any> {
        this.store.dispatch(new RegisterRequestAction());

        let isAlreadyUnregistered = false;

        const onObserved = () => {
            if (!isAlreadyUnregistered) {
                isAlreadyUnregistered = true;
                this.store.dispatch(new UnregisterRequestAction());
            }
        };

        return {
            next: onObserved,
            error: (e) => {
                onObserved();
            },
            complete: onObserved
        };
    }

    constructor(
        @Inject(Actions)
        private readonly actions$: Actions,
        @Inject(Store)
        private readonly store: Store<RequestStoreState>
    ) {
    }

}
