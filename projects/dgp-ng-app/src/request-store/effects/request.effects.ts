import { Injectable } from "@angular/core";
import { Observer } from "rxjs";
import { Store } from "@ngrx/store";
import { Effect, ofType } from "@ngrx/effects";
import { concatMap } from "rxjs/operators";
import { Actions } from "@ngrx/effects";
import {
    registerRequest,
    ScheduleRequestAction,
    scheduleRequestActionType, unregisterRequest,
} from "../actions/request.actions";
import { RequestStoreState } from "../models/request-store-state.model";
import { observeRequest } from "../functions/observe-request.function";

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
        this.store.dispatch(registerRequest());

        let isAlreadyUnregistered = false;

        const onObserved = () => {
            if (!isAlreadyUnregistered) {
                isAlreadyUnregistered = true;
                this.store.dispatch(unregisterRequest());
            }
        };

        return {
            next: onObserved,
            error: () => {
                onObserved();
            },
            complete: onObserved
        };
    }

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<RequestStoreState>
    ) {
    }

}
