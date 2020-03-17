import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { openFileOverlay } from "./actions";
import { Store } from "@ngrx/store";
import { switchMap, tap } from "rxjs/operators";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class FileUploadEffects {

    @Effect({
        dispatch: false
    })
    readonly openFileOverlay$ = this.actions$.pipe(
        ofType(openFileOverlay),
        tap(() => {
            const overlayRef = this.matDialog.open(FileManagerComponent, {
                height: "95%",
                width: "95%",
                panelClass: "dgp-file-manager-overlay"
            });
        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<any>,
        private readonly matDialog: MatDialog
    ) {
    }

}
