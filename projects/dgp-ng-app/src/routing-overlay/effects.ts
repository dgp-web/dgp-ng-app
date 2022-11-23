import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { distinctUntilKeyChanged, filter, map, switchMap, tap } from "rxjs/operators";
import { of, timer } from "rxjs";
import { ActivationStart, NavigationCancel, NavigationEnd, NavigationError, Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { showLoadingSpinner } from "./actions";
import { RoutingOverlayComponent } from "./components/routing-overlay.component";
import { isNullOrUndefined } from "../utils/null-checking.functions";

@Injectable()
export class RoutingOverlayEffects {

    private dialogRef: MatDialogRef<any>;


    readonly observeRouteEvents$ = createEffect(() => this.router.events.pipe(
        map(event => {
            if (event instanceof ActivationStart) {
                return showLoadingSpinner({showSpinner: true});
            }
            if (event instanceof NavigationEnd
                || event instanceof NavigationCancel
                || event instanceof NavigationError) {
                return showLoadingSpinner({showSpinner: false});
            }
            return null;

        }),
        filter(event => !isNullOrUndefined(event))
    ));


    readonly showLoadingSpinner$ = createEffect(() => this.actions$.pipe(
        ofType(showLoadingSpinner),
        distinctUntilKeyChanged("showSpinner"),
        switchMap(action => {
            if (action.showSpinner) {
                return timer(500).pipe(
                    tap(() => {
                        this.dialogRef = this.matDialog.open(RoutingOverlayComponent, {
                            disableClose: true,
                            hasBackdrop: true,
                            panelClass: "dgp-routing-overlay-dialog-panel",
                            backdropClass: "dgp-routing-overlay-backdrop"
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
    ), {
        dispatch: false
    });

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly matDialog: MatDialog
    ) {
    }


}
