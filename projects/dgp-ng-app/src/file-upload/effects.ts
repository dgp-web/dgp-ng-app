import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Inject, Injectable } from "@angular/core";
import { addFilesViaDrop, closeFileManager, downloadFile, openFileManagerOverlay, removeFile, setConfig } from "./actions";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, first, map, switchMap, tap } from "rxjs/operators";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialog } from "@angular/material/dialog";
import { fileUploadEntityStore } from "./store";
import { createKVSFromArray } from "entity-store";
import { ActivatedRoute, Router } from "@angular/router";
import { FILE_UPLOAD_CONFIG, FileUploadConfig, FileUploadQueryParams } from "./models";
import { getAllDirectories } from "./selectors";
import { withoutDispatch } from "../utils/without-dispatch.constant";

@Injectable()
export class FileUploadEffects {


    readonly openFileManagerOverlay$ = createEffect(() => this.actions$.pipe(
        ofType(openFileManagerOverlay),
        tap(action => {

            if (action.fileItems) {
                this.store.dispatch(
                    fileUploadEntityStore.actions.composeEntityActions({
                        set: {
                            fileItem: createKVSFromArray(action.fileItems, x => x.fileItemId),
                            directory: createKVSFromArray(action.directories, x => x.directoryId),
                        }
                    })
                );
            }

            if (action.config) {
                this.store.dispatch(setConfig({
                        config: action.config
                    })
                );
            }

        }),
        switchMap(action => {

            const dialogRef = this.matDialog
                .open(FileManagerComponent, action.config ? action.config.fileManagerMatDialogConfig : this.moduleConfig.fileManagerMatDialogConfig);

            if (action.selectedFileItemId) {
                this.store.dispatch(
                    fileUploadEntityStore.actions.composeEntityActions({
                        select: {
                            fileItem: [action.selectedFileItemId]
                        }
                    })
                );
            }

            return dialogRef.afterClosed();

        }),
        map(() => closeFileManager())
    ));


    readonly addFilesViaDrop$ = createEffect(() => this.actions$.pipe(
        ofType(addFilesViaDrop),
        switchMap(action => {
            return this.store.select(getAllDirectories).pipe(
                first(),
                map(directories => {
                    if (directories.length > 0) {

                        const directory = directories[0];

                        this.router.navigate([], {
                            queryParams: {
                                fileItemId: action.fileItems[0].fileItemId
                            }
                        });

                        return fileUploadEntityStore.actions.composeEntityActions({
                            add: {
                                fileItem: createKVSFromArray(action.fileItems, x => x.fileItemId)
                            },
                            update: {
                                directory: {
                                    [directory.directoryId]: {
                                        fileItemIds: directory.fileItemIds.concat(
                                            action.fileItems.map(x => x.fileItemId)
                                        )
                                    }
                                }
                            }
                        });

                    } else {

                        this.router.navigate([], {
                            queryParams: {
                                fileItemId: action.fileItems[0].fileItemId
                            }
                        });

                        return fileUploadEntityStore.actions.composeEntityActions({
                            add: {
                                fileItem: createKVSFromArray(action.fileItems, x => x.fileItemId),
                                directory: {
                                    ["Files"]: {
                                        directoryId: "Files",
                                        label: "Files",
                                        fileItemIds: action.fileItems.map(x => x.fileItemId)
                                    }
                                }
                            }
                        });

                    }
                })
            );
        })
    ));


    readonly selectFileItem$ = createEffect(() => this.activatedRoute.queryParams.pipe(
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
    ));


    readonly removeFile$ = createEffect(() => this.actions$.pipe(
        ofType(removeFile),
        map(action => fileUploadEntityStore.actions.composeEntityActions({
            remove: {
                fileItem: [action.fileItem.fileItemId]
            }
        }))
    ));

    readonly downloadFile$ = createEffect(() => this.actions$.pipe(
        ofType(downloadFile),
        tap(x => {

            const a = document.createElement("a");
            a.href = x.fileItem.url;
            a.target = "_blank";
            a.click();

        })
    ), withoutDispatch);

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<any>,
        private readonly matDialog: MatDialog,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly moduleConfig: FileUploadConfig
    ) {
        this.store.dispatch(setConfig({
            config: moduleConfig
        }));
    }

}
