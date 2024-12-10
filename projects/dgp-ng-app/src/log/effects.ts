import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { defaultIfEmpty, map, switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { addLogEntry, logError } from "./actions";
import { LogEntry, Severity } from "./models";
import { logStore } from "./reducers";

@Injectable()
export class LogEffects {

    
    readonly logError$ = createEffect(() => this.actions$.pipe(
        ofType(logError),
        map(action => {

            const logEntry: LogEntry = {
                timeStamp: new Date().valueOf(),
                title: action.payload.title,
                content: action.payload.error,
                severity: Severity.Error
            };

            return addLogEntry({logEntry});

        })
    ));

    
    readonly addLogEntry$ = createEffect(() => this.actions$.pipe(
        ofType(addLogEntry),
        map(action => logStore.actions.composeEntityActions({
            add: {
                logEntry: {
                    [action.logEntry.timeStamp.toString()]: action.logEntry
                }
            }
        }))
    ));

    
    readonly showErrorSnack$ = createEffect(() => this.actions$.pipe(
        ofType(addLogEntry),
        switchMap(action => this.matSnackbar.open(action.logEntry.title, "Show log", {
            duration: 5000
        })
            .onAction()
            .pipe(
                map(() => this.router.navigate(["/logEntries", action.logEntry.timeStamp.toString()])),
                defaultIfEmpty(null)
            ))
    ), {
        dispatch: false
    });

    constructor(
        private readonly actions$: Actions,
        private readonly matSnackbar: MatSnackBar,
        private readonly router: Router
    ) {
    }

}
