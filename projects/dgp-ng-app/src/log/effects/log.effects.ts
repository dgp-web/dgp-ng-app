import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { defaultIfEmpty, map, switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { addLogEntry, logError } from "../actions/log.actions";
import { LogEntry, Severity } from "../models/log.models";
import { logStore } from "../reducers/log.reducer";

@Injectable()
export class LogEffects {

    @Effect()
    readonly logError$ = this.actions$.pipe(
        ofType(logError),
        map(action => {

            const logEntry: LogEntry = {
                timeStamp: new Date(),
                title: action.payload.title,
                content: action.payload.error,
                severity: Severity.Error
            };

            return addLogEntry({ logEntry });

        })
    );

    @Effect()
    readonly addLogEntry$ = this.actions$.pipe(
        ofType(addLogEntry),
        map(action => {

            return logStore.actions.composeEntityActions({
                add: {
                    logEntry: {
                        [action.logEntry.timeStamp.toString()]: action.logEntry
                    }
                }
            });

        })
    );

    @Effect({
        dispatch: false
    })
    readonly showErrorSnack = this.actions$.pipe(
        ofType(addLogEntry),
        switchMap(action => {

            return this.matSnackbar.open(action.logEntry.title, "Show log", {
                duration: 5000
            })
                .onAction()
                .pipe(
                    map(() => {
                        return this.router.navigate(["/logEntries", action.logEntry.timeStamp.toString()]);
                    }),
                    defaultIfEmpty(null)
                );

        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly matSnackbar: MatSnackBar,
        private readonly router: Router
    ) {
    }

}
