import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Inject, Injectable } from "@angular/core";
import { addFilesViaDrop, closeFileManager, downloadFile, openFileManagerOverlay, removeFile, setConfig } from "./actions";
import { Store } from "@ngrx/store";
import { first, map, switchMap, tap } from "rxjs/operators";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialog } from "@angular/material/dialog";
import { fileUploadEntityStore } from "./store";
import { createKVSFromArray } from "entity-store";
import { FILE_UPLOAD_CONFIG, FileUploadConfig, FileUploadState } from "./models";
import { getAllDirectories } from "./selectors";
import { withoutDispatch } from "../utils/without-dispatch.constant";
import { selectFileItem } from "../file-viewer/select-file-item.action";
import { DgpContainer } from "../utils/container.component-base";
import { FileSystem } from "./file-system.model";
import { cacheFileSystem } from "./cache-file-system.action";
import { openFileItemInNewTab } from "./open-file-item-in-new-tab.function";

@Injectable()
export class FileUploadEffects extends DgpContainer<FileUploadState> {

    readonly openFileManagerOverlay$ = createEffect(() => this.actions$.pipe(
        ofType(openFileManagerOverlay),
        tap(action => {
            if (action.fileItems) {
                this.dispatch(cacheFileSystem(action as FileSystem));
            }

            if (action.config) {
                this.dispatch(setConfig({config: action.config}));
            }
        }),
        switchMap(action => this.matDialog.open(
            FileManagerComponent,
            action.config
                ? action.config.fileManagerMatDialogConfig
                : this.config.fileManagerMatDialogConfig
        ).afterClosed()),
        map(() => closeFileManager())
    ));

    readonly addFilesViaDrop$ = createEffect(() => this.actions$.pipe(
        ofType(addFilesViaDrop),
        switchMap(action => {
            return this.select(getAllDirectories).pipe(
                first(),
                map(directories => {
                    if (directories.length > 0) {

                        const directory = directories[0];

                        this.dispatch(selectFileItem({
                            fileItemId: action.fileItems[0].fileItemId
                        }));


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

                        this.dispatch(selectFileItem({
                            fileItemId: action.fileItems[0].fileItemId
                        }));

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


    readonly removeFile$ = createEffect(() => this.actions$.pipe(
        ofType(removeFile),
        switchMap(action => this.select(getAllDirectories).pipe(
            first(),
            map(directories => {
                const updatedDirectories = directories.map(directory => {
                    return {
                        ...directory,
                        fileItemIds: directory.fileItemIds.filter(x => x !== action.fileItem.fileItemId)
                    };
                });
                return fileUploadEntityStore.actions.composeEntityActions({
                    remove: {
                        fileItem: [action.fileItem.fileItemId]
                    },
                    update: {
                        directory: createKVSFromArray(updatedDirectories, x => x.directoryId)
                    }
                });
            })
        ))
    ));

    readonly downloadFile$ = createEffect(() => this.actions$.pipe(
        ofType(downloadFile),
        tap(x => openFileItemInNewTab(x.fileItem))
    ), withoutDispatch);

    constructor(
        private readonly actions$: Actions,
        protected readonly store: Store<FileUploadState>,
        private readonly matDialog: MatDialog,
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly config: FileUploadConfig
    ) {
        super(store);

        this.dispatch(setConfig({config}));
    }

}

