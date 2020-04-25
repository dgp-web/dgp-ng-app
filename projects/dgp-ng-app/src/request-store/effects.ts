import { Injectable } from "@angular/core";
import { Observer } from "rxjs";
import { Store } from "@ngrx/store";
import { Effect, ofType } from "@ngrx/effects";
import { concatMap } from "rxjs/operators";
import { Actions } from "@ngrx/effects";
import {
    registerRequest, scheduleRequest, unregisterRequest,
} from "./actions";
import { RequestStoreState } from "./models";
import { observeRequest } from "./functions";

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
            ofType(scheduleRequest),
            concatMap(action => {

                    return observeRequest({
                        request$: action.request$,
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
