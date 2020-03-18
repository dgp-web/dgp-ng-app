import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { addFilesViaDrop, openFileOverlay } from "./actions";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialog } from "@angular/material/dialog";
import { fileUploadEntityStore } from "./store";
import { createKVSFromArray } from "entity-store";
import { ActivatedRoute } from "@angular/router";

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

    @Effect()
    readonly addFilesViaDrop$ = this.actions$.pipe(
        ofType(addFilesViaDrop),
        map(action => {
            return fileUploadEntityStore.actions.composeEntityActions({
                add: {
                    fileItem: createKVSFromArray(action.fileItems, x => x.fileItemId)
                }
            });
        })
    );

    @Effect()
    readonly selectFileItem$ = this.activatedRoute.queryParams.pipe(
        map((x: { readonly fileItemId?: string; }) => x.fileItemId),
        distinctUntilChanged(),
        map(fileItemId => {

            if (!fileItemId) {
                return fileUploadEntityStore.actions.composeEntityActions({
                    select: {
                        fileItem: []
                    }
                });
            }

            return fileUploadEntityStore.actions.composeEntityActions({
                select: {
                    fileItem: [fileItemId]
                }
            });

        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<any>,
        private readonly matDialog: MatDialog,
        private readonly activatedRoute: ActivatedRoute
    ) {
    }

}
