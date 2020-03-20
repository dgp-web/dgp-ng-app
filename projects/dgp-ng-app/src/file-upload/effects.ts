import { Actions, Effect, ofType } from "@ngrx/effects";
import { Inject, Injectable } from "@angular/core";
import { addFilesViaDrop, closeFileManager, openFileManagerOverlay, removeFile } from "./actions";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialog } from "@angular/material/dialog";
import { fileUploadEntityStore } from "./store";
import { createKVSFromArray } from "entity-store";
import { ActivatedRoute, Router } from "@angular/router";
import { FILE_UPLOAD_CONFIG, FileUploadConfig, FileUploadQueryParams } from "./models";

@Injectable()
export class FileUploadEffects {

    @Effect()
    readonly openFileManagerOverlay$ = this.actions$.pipe(
        ofType(openFileManagerOverlay),
        switchMap(() => this.matDialog
            .open(FileManagerComponent, this.moduleConfig.fileManagerMatDialogConfig)
            .afterClosed()),
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
        map((x: FileUploadQueryParams) => x.fileItemId),
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
        map(action => fileUploadEntityStore.actions.composeEntityActions({
            remove: {
                fileItem: [action.fileItem.fileItemId]
            }
        }))
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<any>,
        private readonly matDialog: MatDialog,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly moduleConfig: FileUploadConfig
    ) {
    }

}
