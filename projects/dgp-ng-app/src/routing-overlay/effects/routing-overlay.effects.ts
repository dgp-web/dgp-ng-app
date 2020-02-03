import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { isNullOrUndefined } from "util";
import { distinctUntilKeyChanged, filter, map, switchMap, tap } from "rxjs/operators";
import { timer, of } from "rxjs";
import { ActivationStart, NavigationCancel, NavigationEnd, NavigationError, Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material";
import { showLoadingSpinner } from "../actions/routing-overlay.actions";
import { RoutingOverlayComponent } from "../components/routing-overlay.component";

@Injectable()
export class RoutingOverlayEffects {

    private dialogRef: MatDialogRef<any>;

    @Effect()
    readonly observeRouteEvents$ = this.router.events.pipe(
        map(event => {
            if (event instanceof ActivationStart) {
                return showLoadingSpinner({ showSpinner: true });
            }
            if (event instanceof NavigationEnd
                || event instanceof NavigationCancel
                || event instanceof NavigationError) {
                return showLoadingSpinner({ showSpinner: false });
            }
            return null;

        }),
        filter(event => !isNullOrUndefined(event))
    );

    @Effect({
        dispatch: false
    })
    readonly showLoadingSpinner$ = this.actions$.pipe(
        ofType(showLoadingSpinner),
        distinctUntilKeyChanged("showSpinner"),
        switchMap(action => {
            if (action.showSpinner) {
                return timer(500).pipe(
                    tap(() => {
                        this.dialogRef = this.matDialog.open(RoutingOverlayComponent, {
                            disableClose: true,
                            width: "400px",
                            height: "320px"
                        });
                    })
                );
            } else {
                return of(null).pipe(
                    tap(() => {
                        if (!isNullOrUndefined(this.dialogRef)) {
                            this.dialogRef.close();
                        }
                    })
                );
            }
        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly matDialog: MatDialog
    ) {
    }


}
