import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Inject, Injectable } from "@angular/core";
import {
    addFilesViaDrop,
    closeFileManager,
    downloadFile,
    openFileManagerOverlay,
    removeFile,
    selectNextFile,
    selectPreviousFile,
    setConfig
} from "./actions";
import { Store } from "@ngrx/store";
import { first, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { FileManagerComponent } from "./containers/file-manager.component";
import { MatDialog } from "@angular/material/dialog";
import { fileUploadEntityStore } from "./store";
import { createKVSFromArray } from "entity-store";
import { FILE_UPLOAD_CONFIG, FileUploadConfig, FileUploadState } from "./models";
import { getAllDirectories, getAllFileItems, getSelectedFileItem } from "./selectors";
import { withoutDispatch } from "../utils/without-dispatch.constant";
import { selectFileItem } from "../file-viewer/select-file-item.action";
import { DgpContainer } from "../utils/container.component-base";
import { FileSystem } from "./file-system.model";
import { cacheFileSystem } from "./cache-file-system.action";
import { openFileItemInNewTab } from "./open-file-item-in-new-tab.function";
import { directoryMetadata } from "./constants/directory-metadata.constant";
import { fileItemMetadata } from "./constants/file-item-metadata.constant";
import { selectActionContext } from "../action-context/actions/select-action-context.action";
import { deselectActionContext } from "../action-context/actions/deselect-action-context.action";
import { getHashCode } from "../utils/get-hash-code.function";

@Injectable()
export class FileUploadEffects extends DgpContainer<FileUploadState> {

    readonly openFileManagerOverlay$ = createEffect(() => this.actions$.pipe(
        ofType(openFileManagerOverlay),
        tap(action => {
            if (action.fileItems) {
                this.dispatch(cacheFileSystem(action as FileSystem));

                if (action.selectedFileItemId) {
                    this.dispatch(selectActionContext({
                        actionContext: {
                            key: undefined,
                            label: undefined,
                            type: "fileItem",
                            value: action.fileItems.find(x => x.fileItemId === action.selectedFileItemId)
                        }
                    }));
                } else {
                    this.dispatch(deselectActionContext({}));
                }
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
                                fileItem: createKVSFromArray(action.fileItems, fileItemMetadata.id)
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
                                fileItem: createKVSFromArray(action.fileItems, fileItemMetadata.id),
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
                        directory: createKVSFromArray(updatedDirectories, directoryMetadata.id)
                    }
                });
            })
        ))
    ));

    readonly downloadFile$ = createEffect(() => this.actions$.pipe(
        ofType(downloadFile),
        tap(x => openFileItemInNewTab(x.fileItem))
    ), withoutDispatch);

    readonly selectPreviousFile$ = createEffect(() => this.actions$.pipe(
        ofType(selectPreviousFile),
        withLatestFrom(this.select(getSelectedFileItem), this.select(getAllFileItems)),
        map(x => {
            const selected = x[1];
            const all = x[2];

            const index = all.indexOf(selected);
            const previousIndex = index - 1;

            const item = all[previousIndex];
            return selectActionContext({
                actionContext: {
                    key: getHashCode(item).toString(),
                    label: "File",
                    type: "fileItem",
                    value: item
                }
            });
        })
    ));

    readonly selectNextFile$ = createEffect(() => this.actions$.pipe(
        ofType(selectNextFile),
        withLatestFrom(this.select(getSelectedFileItem), this.select(getAllFileItems)),
        map(x => {
            const selected = x[1];
            const all = x[2];

            const index = all.indexOf(selected);
            const previousIndex = index + 1;

            const item = all[previousIndex];

            return selectActionContext({
                actionContext: {
                    key: getHashCode(item).toString(),
                    label: "File",
                    type: "fileItem",
                    value: item
                }
            });
        })
    ));

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

