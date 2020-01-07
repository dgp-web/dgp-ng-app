import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { defaultIfEmpty, map, switchMap } from "rxjs/operators";
import { CompositeEntityAction } from "entity-store";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AddLogEntryAction, addLogEntryActionType, LogErrorAction, logErrorActionType } from "../actions/log.actions";
import { logStoreFeature } from "../models/log-state.model";
import { Severity } from "../models/severity.model";
import { LogEntry, logEntryType } from "../models/log-entry.model";

@Injectable()
export class LogEffects {

    @Effect()
    readonly logError$ = this.actions$.pipe(
        ofType<LogErrorAction>(logErrorActionType),
        map(action => {

            const logEntry: LogEntry = {
                timeStamp: new Date(),
                title: action.payload.title,
                content: action.payload.error,
                severity: Severity.Error
            };

            return new AddLogEntryAction(logEntry);

        })
    );

    @Effect()
    readonly addLogEntry$ = this.actions$.pipe(
        ofType<AddLogEntryAction>(addLogEntryActionType),
        map(action => {

            const logEntry = action.logEntry;

            return new CompositeEntityAction({
                add: [{
                    storeFeature: logStoreFeature,
                    entityType: logEntryType,
                    payload: {
                        [logEntry.timeStamp.toString()]: logEntry
                    }
                }]
            });

        })
    );

    @Effect({
        dispatch: false
    })
    readonly showErrorSnack = this.actions$.pipe(
        ofType<AddLogEntryAction>(addLogEntryActionType),
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