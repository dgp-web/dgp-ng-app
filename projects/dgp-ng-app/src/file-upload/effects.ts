import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { addFilesViaDrop, closeFileManager, openFileManagerOverlay, removeFile } from "./actions";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialog } from "@angular/material/dialog";
import { fileUploadEntityStore } from "./store";
import { createKVSFromArray } from "entity-store";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class FileUploadEffects {

    @Effect()
    readonly openFileManagerOverlay$ = this.actions$.pipe(
        ofType(openFileManagerOverlay),
        switchMap(() => {
            return this.matDialog.open(FileManagerComponent, {
                height: "80%",
                width: "80%",
                panelClass: "dgp-file-manager-overlay"
            }).afterClosed();
        }),
        map(() => closeFileManager())
    );

    @Effect()
    readonly addFilesViaDrop$ = this.actions$.pipe(
        ofType(addFilesViaDrop),
        map(action => {

            this.router.navigate([], {
                queryParams: {
                    fileItemId: action.fileItems[0].fileItemId
                }
            });

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

    @Effect()
    readonly removeFile$ = this.actions$.pipe(
        ofType(removeFile),
        map(action => {
            return fileUploadEntityStore.actions.composeEntityActions({
                remove: {
                    fileItem: [action.fileItem.fileItemId]
                }
            });
        })
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<any>,
        private readonly matDialog: MatDialog,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) {
    }

}
