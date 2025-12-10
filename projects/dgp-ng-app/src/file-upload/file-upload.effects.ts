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
import { toFileItemActionContext } from "./functions";
import { getListItemNeighbor } from "../utils/get-list-item-neighbor.function";

@Injectable()
export class FileUploadEffects extends DgpContainer<FileUploadState> {

    readonly openFileManagerOverlay$ = createEffect(() => this.actions$.pipe(
        ofType(openFileManagerOverlay),
        withLatestFrom(this.select(getAllFileItems)),
        tap(x => {
            const action = x[0];
            const fileItems = x[1];

            if (action.fileItems) {
                this.dispatch(cacheFileSystem(action as FileSystem));

                if (action.selectedFileItemId) {
                    const fileItem = action.fileItems.find(x1 => x1.fileItemId === action.selectedFileItemId);
                    const actionContext = toFileItemActionContext(fileItem);

                    this.dispatch(selectActionContext({
                        actionContext
                    }));
                } else if (action.fileItems.length > 0) {
                    const fileItem = action.fileItems[0];
                    const actionContext = toFileItemActionContext(fileItem);
                    this.dispatch(selectActionContext({
                        actionContext
                    }));
                } else {
                    this.dispatch(deselectActionContext({}));
                }
            } else if (fileItems?.length > 0) {
                /**
                 * Select first item
                 */
                const fileItem = fileItems[0];
                const actionContext = toFileItemActionContext(fileItem);
                this.dispatch(selectActionContext({
                    actionContext
                }));
            }


            if (action.config) {
                this.dispatch(setConfig({config: action.config}));
            }
        }),
        switchMap(x => this.matDialog.open(
            FileManagerComponent,
            x[0].config
                ? x[0].config.fileManagerMatDialogConfig
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

                        const fileItem = action.fileItems[0];
                        const actionContext = toFileItemActionContext(fileItem);

                        this.dispatch(selectActionContext({
                            actionContext
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

                        const fileItem = action.fileItems[0];
                        const actionContext = toFileItemActionContext(fileItem);

                        this.dispatch(selectActionContext({
                            actionContext
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

            const item = getListItemNeighbor({
                neighbor: "previous",
                collection: all,
                item: selected
            });

            return selectActionContext({
                actionContext: toFileItemActionContext(item)
            });
        })
    ));

    readonly selectNextFile$ = createEffect(() => this.actions$.pipe(
        ofType(selectNextFile),
        withLatestFrom(this.select(getSelectedFileItem), this.select(getAllFileItems)),
        map(x => {
            const selected = x[1];
            const all = x[2];

            const item = getListItemNeighbor({
                neighbor: "next",
                collection: all,
                item: selected
            });

            return selectActionContext({
                actionContext: toFileItemActionContext(item)
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

